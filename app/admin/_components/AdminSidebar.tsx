'use client'

import Logo from '@/components/shared/logo'
import {
	FolderTree,
	LayoutDashboard,
	LogOut,
	Package,
	ShoppingBag,
	Ticket,
	Users,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sidebarItems = [
	{ name: 'Bosh sahifa', href: '/admin', icon: LayoutDashboard },
	{ name: 'Buyurtmalar', href: '/admin/orders', icon: ShoppingBag },
	{ name: 'Mahsulotlar', href: '/admin/products', icon: Package },
	{ name: 'Kategoriyalar', href: '/admin/categories', icon: FolderTree },
	{ name: 'Foydalanuvchilar', href: '/admin/users', icon: Users },
	{ name: 'Kuponlar', href: '/admin/coupons', icon: Ticket },
]

export default function AdminSidebar() {
	const pathname = usePathname()

	return (
		<aside className='w-64 border-r border-gray-200/80 bg-white flex flex-col justify-between h-screen sticky top-0 font-montserrat hidden lg:flex'>
			<div className='p-6'>
				{/* Admin Logo / Brand */}
				<div className='flex items-center gap-3 mb-8 px-2'>
					<Logo />
					{/* <div>
						<span className='font-space-grotesk font-extrabold text-lg text-black tracking-tight block'>
							Admin Panel
						</span>
						<span className='text-[10px] text-gray-400 font-semibold uppercase tracking-wider'>
							Management
						</span>
					</div> */}
				</div>

				{/* Navigation Links */}
				<nav className='space-y-1.5'>
					{sidebarItems.map(item => {
						const Icon = item.icon
						// Bosh sahifa uchun aniq tenglik, qolganlar uchun subroute tekshiruvi
						const isActive =
							item.href === '/admin'
								? pathname === '/admin'
								: pathname.startsWith(item.href)

						return (
							<Link
								key={item.href}
								href={item.href}
								className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
									isActive
										? 'bg-black text-white shadow-sm font-semibold'
										: 'text-gray-600 hover:bg-gray-50 hover:text-black'
								}`}
							>
								<Icon
									className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`}
								/>
								{item.name}
							</Link>
						)
					})}
				</nav>
			</div>

			{/* Do'konga qaytish tugmasi */}
			<div className='p-6 border-t border-gray-100'>
				<Link
					href='/dashboard'
					className='flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-black transition-all'
				>
					<LogOut className='w-4 h-4 text-gray-400 rotate-180' />
					Do'konga qaytish
				</Link>
			</div>
		</aside>
	)
}
