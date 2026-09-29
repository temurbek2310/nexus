'use client'

import { UserButton } from '@clerk/nextjs'
import { Bell, Menu, Search } from 'lucide-react'

export default function AdminNavbar() {
	return (
		<header className='h-20 border-b border-gray-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30 px-6 lg:px-10 flex items-center justify-between font-montserrat'>
			<div className='flex items-center gap-4'>
				<div className='lg:hidden'>
					<button className='p-2 rounded-xl border border-gray-200 text-gray-600'>
						<Menu className='w-5 h-5' />
					</button>
				</div>
				<div className='relative hidden sm:block w-72'>
					<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
					<input
						type='text'
						placeholder='Admin qidiruv...'
						className='w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2 pl-9 pr-4 text-sm font-medium outline-none transition-all focus:border-black focus:bg-white focus:ring-1 focus:ring-black shadow-sm'
					/>
				</div>
			</div>

			<div className='flex items-center gap-4'>
				<button className='relative p-2.5 rounded-xl border border-gray-200/80 text-gray-500 hover:text-black hover:border-black transition-all bg-white shadow-sm cursor-pointer'>
					<Bell className='w-4 h-4' />
					<span className='absolute top-2 right-2 w-2 h-2 rounded-full bg-black'></span>
				</button>

				<div className='h-6 w-[1px] bg-gray-200'></div>

				<div className='flex items-center gap-3'>
					<UserButton />
				</div>
			</div>
		</header>
	)
}
