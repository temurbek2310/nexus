'use client'

import { Badge } from '@/components/ui/badge'
import { IUser, toggleUserRole } from '@/lib/actions/user.actions'
import {
	ChevronLeft,
	ChevronRight,
	Mail,
	Search,
	ShieldCheck,
	User,
	Users,
} from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface UsersClientProps {
	initialData: {
		users: IUser[]
		totalPages: number
		currentPage: number
		totalUsers: number
	}
	query: string
}

export default function UsersClient({ initialData, query }: UsersClientProps) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const [searchTerm, setSearchTerm] = useState(query)
	const [isPending, setIsPending] = useState(false)

	// DEBOUNCE SEARCH (Yozishni to'xtatgandan 500ms keyin so'rov yuboradi)
	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			const params = new URLSearchParams(searchParams.toString())
			params.set('page', '1') // Qidiruv bo'lganda doim 1-sahifaga qaytish

			if (searchTerm) {
				params.set('q', searchTerm)
			} else {
				params.delete('q')
			}

			// URL ni yangilaymiz (Next.js serverni avtomat ishga tushiradi)
			router.replace(`${pathname}?${params.toString()}`)
		}, 500)

		return () => clearTimeout(delayDebounceFn)
	}, [searchTerm, pathname, router, searchParams])

	// SAHIFANI O'ZGARTIRISH
	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(searchParams.toString())
		params.set('page', newPage.toString())
		router.push(`${pathname}?${params.toString()}`)
	}

	// ROLNI O'ZGARTIRISH
	const handleToggleRole = async (id: string, currentRole: string) => {
		if (
			confirm(
				`Rostdan ham bu foydalanuvchini ${currentRole === 'admin' ? 'User' : 'Admin'} qilmoqchimisiz?`,
			)
		) {
			setIsPending(true)
			await toggleUserRole(id, currentRole)
			setIsPending(false)
		}
	}

	return (
		<div className='flex flex-col space-y-10 animate-in fade-in duration-700 ease-out pb-12 pt-4'>
			{/* HEADER */}
			<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
				<div>
					<h1 className='font-space-grotesk text-3xl font-extrabold text-black tracking-tight mb-2'>
						Foydalanuvchilar
					</h1>
					<p className='font-montserrat text-sm text-gray-500 font-medium'>
						Do'koningizdagi barcha mijozlar va adminlarni boshqaring.
					</p>
				</div>
				<div className='flex items-center bg-white px-4 py-2.5 rounded-xl border border-gray-200/80 shadow-sm'>
					<span className='font-space-grotesk font-bold text-gray-900 text-lg mr-2'>
						{initialData.totalUsers}
					</span>
					<span className='font-montserrat text-xs text-gray-500 font-semibold uppercase tracking-wider'>
						Jami foydalanuvchi
					</span>
				</div>
			</div>

			{/* ASOSIY OYNA */}
			<div className='flex flex-col rounded-[24px] border border-gray-200/80 bg-white shadow-sm overflow-hidden'>
				{/* Qidiruv Paneli */}
				<div className='flex flex-col border-b border-gray-100 p-5 bg-gray-50/30'>
					<div className='relative w-full lg:w-96'>
						<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
						<input
							type='text'
							placeholder='Ism, familiya, email yoki username...'
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							className='w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm font-medium outline-none transition-all focus:border-black focus:ring-1 focus:ring-black shadow-sm font-montserrat'
						/>
					</div>
				</div>

				{/* Jadval */}
				<div className='overflow-x-auto min-h-[480px] flex flex-col justify-between'>
					<table className='w-full text-left border-collapse'>
						<thead>
							<tr className='bg-gray-50/50 border-b border-gray-100 text-gray-500'>
								<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6 w-16'>
									Rasm
								</th>
								<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6'>
									Foydalanuvchi
								</th>
								<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6'>
									Email
								</th>
								<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6'>
									Rol
								</th>
								<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6 text-right'>
									Ro'yxatdan o'tgan
								</th>
								<th className='py-4 px-6'></th>
							</tr>
						</thead>
						<tbody
							className={`divide-y divide-gray-100 font-montserrat transition-opacity ${isPending ? 'opacity-50' : 'opacity-100'}`}
						>
							{initialData.users.length > 0 ? (
								initialData.users.map(user => {
									const isAdmin = user.role === 'admin'
									const formattedDate = new Date(
										user.createdAt,
									).toLocaleDateString('uz-UZ', {
										day: '2-digit',
										month: 'short',
										year: 'numeric',
									})

									return (
										<tr
											key={user._id}
											className='group hover:bg-gray-50/50 transition-colors'
										>
											{/* Avatar */}
											<td className='py-4 px-6'>
												<div className='w-12 h-12 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden shadow-sm'>
													{user.photo ? (
														<img
															src={user.photo}
															alt={user.firstName || 'user'}
															className='w-full h-full object-cover'
														/>
													) : (
														<User className='w-5 h-5 text-gray-400' />
													)}
												</div>
											</td>

											{/* Ism va Familiya */}
											<td className='py-4 px-6'>
												<div className='flex flex-col'>
													<span className='font-space-grotesk text-sm font-bold text-gray-900'>
														{user.firstName || user.lastName
															? `${user.firstName || ''} ${user.lastName || ''}`
															: 'Ismsiz mijoz'}
													</span>
													{user.username && (
														<span className='text-[11px] font-medium text-gray-500 mt-0.5'>
															@{user.username}
														</span>
													)}
												</div>
											</td>

											{/* Email */}
											<td className='py-4 px-6 whitespace-nowrap'>
												<div className='flex items-center text-sm font-medium text-gray-600'>
													<Mail className='w-3.5 h-3.5 mr-1.5 text-gray-400' />
													{user.email}
												</div>
											</td>

											{/* Role Badge */}
											<td className='py-4 px-6 whitespace-nowrap'>
												<Badge
													variant='outline'
													className={`text-[10px] font-bold px-2.5 py-1 border-none flex items-center gap-1.5 w-max ${isAdmin ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}
												>
													{isAdmin ? (
														<ShieldCheck className='w-3 h-3' />
													) : (
														<Users className='w-3 h-3' />
													)}
													{isAdmin ? 'Admin' : 'Mijoz'}
												</Badge>
											</td>

											{/* Sana */}
											<td className='py-4 px-6 text-right whitespace-nowrap'>
												<span className='text-sm font-medium text-gray-500'>
													{formattedDate}
												</span>
											</td>

											{/* Harakatlar (Role almashtirish) */}
											<td className='py-4 px-6 text-right whitespace-nowrap'>
												<button
													onClick={() => handleToggleRole(user._id, user.role)}
													className='inline-flex items-center justify-center h-8 px-3 rounded-lg border border-gray-200 text-[11px] font-bold text-gray-500 hover:text-black hover:border-black bg-white shadow-sm transition-all opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 cursor-pointer'
												>
													{isAdmin ? 'Mijoz qilish' : 'Admin qilish'}
												</button>
											</td>
										</tr>
									)
								})
							) : (
								<tr>
									<td
										colSpan={6}
										className='py-20 text-center text-sm text-gray-500 font-medium'
									>
										{searchTerm
											? 'Siz qidirgan foydalanuvchi topilmadi.'
											: "Hozircha foydalanuvchilar yo'q."}
									</td>
								</tr>
							)}
						</tbody>
					</table>

					{/* 4. PAGINATION (Sahifalash qismi) */}
					{initialData.totalPages > 1 && (
						<div className='flex items-center justify-between border-t border-gray-100 p-4 bg-gray-50/50'>
							<span className='text-xs font-semibold text-gray-500 font-montserrat'>
								Sahifa {initialData.currentPage} / {initialData.totalPages}
							</span>
							<div className='flex items-center gap-2'>
								<button
									onClick={() => handlePageChange(initialData.currentPage - 1)}
									disabled={initialData.currentPage === 1}
									className='flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 bg-white text-gray-600 hover:text-black hover:border-black disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all shadow-sm cursor-pointer'
								>
									<ChevronLeft className='w-4 h-4' />
								</button>
								<button
									onClick={() => handlePageChange(initialData.currentPage + 1)}
									disabled={initialData.currentPage === initialData.totalPages}
									className='flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 bg-white text-gray-600 hover:text-black hover:border-black disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all shadow-sm cursor-pointer'
								>
									<ChevronRight className='w-4 h-4' />
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
