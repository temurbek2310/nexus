'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { useClerk, useUser } from '@clerk/nextjs'
import { LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'

export const UserMenu = () => {
	const { user } = useUser()
	const { signOut } = useClerk()

	if (!user) return null

	const initials = user.firstName?.charAt(0) || user.username?.charAt(0) || 'U'

	return (
		<Popover>
			{/* MUAMMO HAL QILINDI: asChild olib tashlandi va klasslar to'g'ridan-to'g'ri PopoverTrigger ga berildi */}
			<PopoverTrigger className='rounded-full outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 transition-all hover:opacity-80 cursor-pointer'>
				<Avatar className='size-9 border border-gray-200'>
					<AvatarImage src={user.imageUrl} alt={user.fullName || 'User'} />
					<AvatarFallback className='bg-gray-100 text-black font-space-grotesk font-bold'>
						{initials}
					</AvatarFallback>
				</Avatar>
			</PopoverTrigger>

			<PopoverContent
				align='end'
				className='w-64 p-2 rounded-2xl bg-white border border-gray-200 shadow-xl shadow-black/5 font-montserrat'
			>
				<div className='flex flex-col px-3 py-3 border-b border-gray-100 mb-2'>
					<span className='font-space-grotesk font-bold text-sm text-black truncate'>
						{user.fullName || user.username}
					</span>
					<span className='text-xs text-gray-500 truncate mt-0.5'>
						{user.primaryEmailAddress?.emailAddress}
					</span>
				</div>

				<div className='flex flex-col gap-1'>
					<Button
						asChild
						variant='ghost'
						className='justify-start px-3 h-10 text-sm font-medium hover:bg-gray-50 rounded-xl cursor-pointer'
					>
						<Link href='/profile'>
							<User className='size-4 mr-2 text-gray-500' /> Profil
						</Link>
					</Button>

					<Button
						asChild
						variant='ghost'
						className='justify-start px-3 h-10 text-sm font-medium hover:bg-gray-50 rounded-xl cursor-pointer'
					>
						<Link href='/settings'>
							<Settings className='size-4 mr-2 text-gray-500' /> Sozlamalar
						</Link>
					</Button>

					<Button
						variant='ghost'
						onClick={() => signOut({ redirectUrl: '/' })}
						className='justify-start px-3 h-10 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl cursor-pointer mt-1'
					>
						<LogOut className='size-4 mr-2' /> Tizimdan chiqish
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	)
}
