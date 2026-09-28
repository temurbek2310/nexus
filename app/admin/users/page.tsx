import { getUsers } from '@/lib/actions/user.actions'
import { Suspense } from 'react'
import UsersClient from './_components/UserClient'

// Next.js 15+ da searchParams Asinxron (Promise) ishlaydi
interface PageProps {
	searchParams: Promise<{ q?: string; page?: string }>
}

async function UsersData({ searchParams }: PageProps) {
	const resolvedParams = await searchParams

	const query = resolvedParams?.q || ''
	const page = Number(resolvedParams?.page) || 1

	// Server action orqali bazadan ma'lumotlarni tortamiz
	const data = await getUsers({ query, page, limit: 10 })

	return <UsersClient initialData={data} query={query} />
}

export default function AdminUsersPage({ searchParams }: PageProps) {
	return (
		<Suspense
			fallback={
				<div className='flex flex-col items-center justify-center min-h-[60vh] space-y-4'>
					<div className='w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin'></div>
					<p className='font-montserrat text-sm font-medium text-gray-500 animate-pulse'>
						Foydalanuvchilar ro'yxati yuklanmoqda...
					</p>
				</div>
			}
		>
			<UsersData searchParams={searchParams} />
		</Suspense>
	)
}
