import { createUser, deleteUser, updateUser } from '@/lib/actions/user.actions'
import { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook } from 'svix'

export async function POST(req: Request) {
	// QOPQON: Vercel so'rovni qabul qilishi bilan shu yozuv logga chiqishi kerak!
	console.log("🔥🔥🔥 DIQQAT: CLERK WEBHOOK ISHGA TUSHDI! SO'ROV KELDI! 🔥🔥🔥")
	// Clerk Dashboard'dan olinadigan Webhook Secret
	const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

	if (!WEBHOOK_SECRET) {
		throw new Error('WEBHOOK_SECRET .env.local faylida topilmadi')
	}

	// Svix yordamida headerlarni olish
	const headerPayload = await headers()
	const svix_id = headerPayload.get('svix-id')
	const svix_timestamp = headerPayload.get('svix-timestamp')
	const svix_signature = headerPayload.get('svix-signature')

	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response('Xatolik: Svix headerlari topilmadi', {
			status: 400,
		})
	}

	// Body ma'lumotlarini olish
	const payload = await req.json()
	const body = JSON.stringify(payload)

	const wh = new Webhook(WEBHOOK_SECRET)

	let evt: WebhookEvent

	// Signature (Imzo) orqali xavfsizlikni tekshirish
	try {
		evt = wh.verify(body, {
			'svix-id': svix_id,
			'svix-timestamp': svix_timestamp,
			'svix-signature': svix_signature,
		}) as unknown as WebhookEvent
	} catch (err) {
		console.error('Webhook tasdiqlashda xatolik:', err)
		return new Response('Xatolik yuz berdi', { status: 400 })
	}

	// Event Turi (Yaratish, Yangilash, O'chirish)
	const eventType = evt.type

	// 1. FOYDALANUVCHI YARATILGANDA
	if (eventType === 'user.created') {
		const { id, email_addresses, image_url, first_name, last_name, username } =
			evt.data

		const user = {
			clerkId: id,
			email: email_addresses[0].email_address,
			username: username || first_name,
			firstName: first_name,
			lastName: last_name,
			photo: image_url,
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
			firstName: first_name,
			lastName: last_name,
			username: username || first_name,
			photo: image_url,
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
