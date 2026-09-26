import { createUser, deleteUser, updateUser } from '@/lib/actions/user.actions'
import { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook } from 'svix'

export async function POST(req: Request) {
	console.log("🔥🔥🔥 DIQQAT: CLERK WEBHOOK ISHGA TUSHDI! SO'ROV KELDI! 🔥🔥🔥")

	const WEBHOOK_SECRET =
		process.env.CLERK_WEBHOOK_SECRET || process.env.WEBHOOK_SECRET

	if (!WEBHOOK_SECRET) {
		throw new Error('WEBHOOK_SECRET .env faylida topilmadi')
	}

	const headerPayload = await headers()
	const svix_id = headerPayload.get('svix-id')
	const svix_timestamp = headerPayload.get('svix-timestamp')
	const svix_signature = headerPayload.get('svix-signature')

	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response('Xatolik: Svix headerlari topilmadi', {
			status: 400,
		})
	}

	// 1. Body ni to'g'ridan-to'g'ri string sifatida o'qiymiz
	const body = await req.text()

	const wh = new Webhook(WEBHOOK_SECRET)

	// 2. Svix faqat imzo to'g'riligini tekshiradi (hech narsa qaytarmaydi)
	try {
		wh.verify(body, {
			'svix-id': svix_id,
			'svix-timestamp': svix_timestamp,
			'svix-signature': svix_signature,
		})
	} catch (err) {
		console.error('Webhook tasdiqlashda xatolik:', err)
		return new Response('Xatolik yuz berdi', { status: 400 })
	}

	// 3. Tasdiqlangandan so'ng body ni WebhookEvent obyektiga aylantiramiz
	const evt = JSON.parse(body) as WebhookEvent
	const eventType = evt.type

	// 1. FOYDALANUVCHI YARATILGANDA
	if (eventType === 'user.created') {
		const { id, email_addresses, image_url, first_name, last_name, username } =
			evt.data

		const user = {
			clerkId: id,
			email: email_addresses[0].email_address,
			username: username || first_name || `user_${id.slice(-6)}`,
			firstName: first_name || '',
			lastName: last_name || '',
			photo: image_url || '',
		}

		const newUser = await createUser(user)
		return NextResponse.json({
			message: 'Yangi foydalanuvchi yaratildi',
			user: newUser,
		})
	}

	// 2. FOYDALANUVCHI MA'LUMOTLARI YANGILANGANDA
	if (eventType === 'user.updated') {
		const { id, image_url, first_name, last_name, username } = evt.data

		const user = {
			firstName: first_name || '',
			lastName: last_name || '',
			username: username || first_name || `user_${id.slice(-6)}`,
			photo: image_url || '',
		}

		const updatedUser = await updateUser(id, user)
		return NextResponse.json({
			message: 'Foydalanuvchi yangilandi',
			user: updatedUser,
		})
	}

	// 3. FOYDALANUVCHI O'CHIRILGANDA
	if (eventType === 'user.deleted') {
		const { id } = evt.data
		const deletedUser = await deleteUser(id!)
		return NextResponse.json({
			message: "Foydalanuvchi o'chirildi",
			user: deletedUser,
		})
	}

	return new Response('', { status: 200 })
}
