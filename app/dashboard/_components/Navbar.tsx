'use client'

import { UserMenu } from '@/components/shared/user-menu' // O'zimizning maxsus UserMenu
import { Menu, Search, Slash } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { dashboardRoutes } from './Sidebar' // Sidebar'dan marshrutlarni import qilamiz

export default function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
	const pathname = usePathname()

	// Hozirgi sahifa nomini topish (Breadcrumb uchun)
	let pageName = 'Umumiy'
	const currentRoute = dashboardRoutes.find(route => route.href === pathname)

	if (currentRoute) {
		pageName = currentRoute.name
	} else if (pathname === '/dashboard') {
		pageName = 'Umumiy'
	} else if (pathname.startsWith('/dashboard/orders/')) {
		// Dinamik URL: /dashboard/orders/[id]
		const orderId = pathname.split('/').pop()
		if (orderId && orderId.length >= 6) {
			pageName = `Buyurtma #ORD-${orderId.slice(-6).toUpperCase()}`
		} else {
			pageName = 'Buyurtma tafsilotlari'
		}
	}

	return (
		<header className='sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-100 bg-white/70 px-6 backdrop-blur-md transition-all'>
			{/* Chap qism: Mobil menyu tugmasi va Breadcrumb */}
			<div className='flex items-center space-x-2 sm:space-x-4'>
				<button
					onClick={onMenuClick}
					className='md:hidden flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-black'
				>
					<Menu className='h-5 w-5' />
				</button>

				{/* Vercel uslubidagi Breadcrumb */}
				<div className='hidden items-center space-x-2 font-montserrat text-sm font-medium sm:flex'>
					<span className='text-gray-500'>Dashboard</span>
					<Slash className='h-3 w-3 -rotate-12 text-gray-300' />
					{/* Sahifa nomi (Agar Orders Details bo'lsa ko'k rangga o'tadi) */}
					<span
						className={`font-semibold ${pathname.startsWith('/dashboard/orders/') ? 'text-black' : 'text-black'}`}
					>
						{pageName}
					</span>
				</div>
			</div>

			{/* O'ng qism: Qidiruv paneli va UserMenu */}
			<div className='flex items-center space-x-4 sm:space-x-6'>
				<div className='hidden cursor-text items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 w-64 transition-colors hover:border-gray-300 md:flex'>
					<Search className='mr-2 h-4 w-4 text-gray-400' />
					<span className='flex-1 font-montserrat text-xs font-medium text-gray-400 text-left'>
						Qidirish...
					</span>
					<div className='flex items-center space-x-1'>
						<kbd className='rounded border border-gray-200 bg-white px-1.5 py-0.5 font-sans text-[10px] font-semibold text-gray-500 shadow-sm'>
							⌘
						</kbd>
						<kbd className='rounded border border-gray-200 bg-white px-1.5 py-0.5 font-sans text-[10px] font-semibold text-gray-500 shadow-sm'>
							K
						</kbd>
					</div>
				</div>

				{/* Vertikal chiziq (Divider) */}
				<div className='hidden h-6 w-px bg-gray-200 md:block'></div>

				<UserMenu />
			</div>
		</header>
	)
}
