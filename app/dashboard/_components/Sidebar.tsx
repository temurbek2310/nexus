'use client'

import Logo from '@/components/shared/logo'
import {
	CreditCard,
	Heart,
	LayoutDashboard,
	MapPin,
	Settings,
	ShoppingBag,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const dashboardRoutes = [
	{ name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
	{ name: 'Orders', href: '/dashboard/orders', icon: ShoppingBag },
	{ name: 'Payments', href: '/dashboard/payments', icon: CreditCard },
	{ name: 'Addresses', href: '/dashboard/addresses', icon: MapPin },
	{ name: 'Wishlist', href: '/dashboard/wishlist', icon: Heart },
	{ name: 'Settings', href: '/dashboard/user-profile', icon: Settings },
]

export default function Sidebar() {
	const pathname = usePathname()

	return (
		<aside className='flex h-full flex-col bg-white'>
			<div className='flex h-16 items-center border-b border-gray-100 px-6'>
				<Logo />
			</div>

			<nav className='flex-1 space-y-1 p-4'>
				{dashboardRoutes.map(item => {
					const isActive = pathname === item.href
					const Icon = item.icon

					return (
						<Link
							key={item.name}
							href={item.href}
							className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
								isActive
									? 'bg-gray-100 text-gray-900'
									: 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
							}`}
						>
							<Icon
								className={`h-5 w-5 ${isActive ? 'text-gray-900' : 'text-gray-400'}`}
							/>
							{item.name}
						</Link>
					)
				})}
			</nav>
			{/* Pastki qismdagi qo'shimcha menyu yoki reklama uchun joy */}
			<div className='p-4 border-t border-gray-100'>
				<div className='bg-[#fafafa] rounded-xl p-4 border border-gray-200/80'>
					<p className='font-montserrat text-xs font-semibold text-black mb-1'>
						Yordam kerakmi?
					</p>
					<p className='font-montserrat text-[10px] text-gray-500 mb-3'>
						Bizning qo'llab-quvvatlash xizmatimiz 24/7 aloqada.
					</p>
					<button className='w-full font-montserrat text-xs font-bold bg-white border border-gray-200 text-black rounded-lg py-2 hover:border-black transition-colors'>
						Bog'lanish
					</button>
				</div>
			</div>
		</aside>
	)
}
