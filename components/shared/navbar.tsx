'use client' // usePathname ishlashi uchun bu qator majburiy

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './logo'

// Linklar ro'yxatini massivda saqlash kodni toza qiladi
const navLinks = [
	{ label: 'Katalog', href: '/catalog' },
	{ label: 'Shop', href: '/shop' },
	{ label: 'Chegirmalar', href: '/discounts' },
	{ label: 'Biz haqimizda', href: '/about' },
]

const Navbar = () => {
	const pathname = usePathname()

	return (
		<header className='fixed top-0 left-0 w-full z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between'>
				<div className='flex items-center gap-8'>
					<Logo />

					{/* Menyu linklari */}
					<nav className='hidden md:flex items-center gap-6 font-montserrat text-sm font-medium'>
						{navLinks.map(link => {
							// Agar hozirgi URL manzil link.href bilan bir xil bo'lsa yoki shundan boshlansa faol bo'ladi
							const isActive =
								pathname === link.href || pathname.startsWith(`${link.href}/`)

							return (
								<Link
									key={link.href}
									href={link.href}
									className={`transition-colors ${
										isActive
											? 'text-black' // Faol sahifada to'q qora rang
											: 'text-gray-500 hover:text-black' // Boshqa sahifada kulrang
									}`}
								>
									{link.label}
								</Link>
							)
						})}
					</nav>
				</div>

				{/* Tugmalar */}
				<div className='flex items-center gap-4'>
					<button className='text-sm font-medium text-gray-500 hover:text-black transition-colors hidden sm:block'>
						Kirish
					</button>
					{/* Vercel'ning mashhur qora tugmasi */}
					<button className='h-9 px-4 flex items-center justify-center rounded-md bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors'>
						Savat (0)
					</button>
				</div>
			</div>
		</header>
	)
}

export default Navbar
