'use client'

import { cn } from '@/lib/utils'
import { useCartStore } from '@/store/useCartStore'
import { useUser } from '@clerk/nextjs'
import { Search, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Logo from './logo'
import { UserMenu } from './user-menu'

const navLinks = [
	{ label: 'Katalog', href: '/catalog' },
	{ label: 'Shop', href: '/shop' },
	{ label: 'Chegirmalar', href: '/discounts' },
]

const Navbar = () => {
	const pathname = usePathname()
	const router = useRouter()

	const cartItems = useCartStore(state => state.items)
	const [mounted, setMounted] = useState(false)

	// ================= CLERK HOOK'I =================
	const { isLoaded, isSignedIn } = useUser()

	// ================= QIDIRUV (SEARCH) STATE LARI =================
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)
	const initialRender = useRef(true)

	useEffect(() => {
		setMounted(true)
	}, [])

	const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

	useEffect(() => {
		if (isSearchOpen && inputRef.current) {
			inputRef.current.focus()
		}
	}, [isSearchOpen])

	useEffect(() => {
		if (initialRender.current) {
			initialRender.current = false
			return
		}

		const timer = setTimeout(() => {
			if (isSearchOpen && searchQuery.trim().length > 0) {
				router.push(`/shop?q=${encodeURIComponent(searchQuery)}`)
			}
		}, 700)

		return () => clearTimeout(timer)
	}, [searchQuery, isSearchOpen, router])

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && searchQuery.trim().length > 0) {
			router.push(`/shop?q=${encodeURIComponent(searchQuery)}`)
		}
	}

	const closeSearch = () => {
		setIsSearchOpen(false)
		setSearchQuery('')
	}

	return (
		<header className='fixed top-0 left-0 w-full z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between'>
				<div className='flex items-center gap-8'>
					<Logo />

					{/* Menyu linklari */}
					<nav className='hidden md:flex items-center gap-6 font-montserrat text-sm font-medium'>
						{navLinks.map(link => {
							const isActive =
								pathname === link.href || pathname.startsWith(`${link.href}/`)
							return (
								<Link
									key={link.href}
									href={link.href}
									className={`transition-colors ${
										isActive ? 'text-black' : 'text-gray-500 hover:text-black'
									}`}
								>
									{link.label}
								</Link>
							)
						})}
					</nav>
				</div>

				{/* Tugmalar paneli */}
				<div className='flex items-center gap-2 sm:gap-4'>
					{/* ================= CREATIVE VERCEL SEARCH ================= */}
					<div
						className={cn(
							'flex items-center overflow-hidden transition-all duration-500 ease-out',
							isSearchOpen
								? 'w-48 sm:w-64 bg-gray-50/80 border border-gray-200 rounded-full px-3 opacity-100'
								: 'w-9 rounded-full bg-transparent border border-transparent hover:bg-gray-100',
						)}
					>
						<button
							onClick={() => !isSearchOpen && setIsSearchOpen(true)}
							className={cn(
								'flex items-center justify-center shrink-0 transition-colors h-9',
								isSearchOpen
									? 'text-gray-400 cursor-default'
									: 'w-full text-gray-500 hover:text-black cursor-pointer',
							)}
						>
							<Search className='size-4.5' />
						</button>

						<input
							ref={inputRef}
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder='Qidirish...'
							className={cn(
								'bg-transparent border-none outline-none font-montserrat text-sm h-9 w-full placeholder:text-gray-400 text-black transition-opacity duration-300 ml-2',
								isSearchOpen ? 'opacity-100' : 'opacity-0',
							)}
						/>

						{isSearchOpen && (
							<button onClick={closeSearch} className='shrink-0 ml-1 group p-1'>
								<X className='size-4 text-gray-400 group-hover:text-black transition-colors' />
							</button>
						)}
					</div>

					{/* ================= SAVAT (O'rtada) ================= */}
					<Link
						href='/cart'
						className='h-9 px-4 flex items-center justify-center rounded-md bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors shrink-0 ml-1'
					>
						Savat ({mounted ? cartCount : 0})
					</Link>

					{/* ================= CLERK AUTH QISMI (Eng o'ngda) ================= */}

					{/* Yuklanayotganda "Skeleton" */}
					{!isLoaded ? (
						<div className='w-10 h-10 ml-2 bg-gray-100 rounded-full animate-pulse hidden sm:block'></div>
					) : (
						<>
							{/* Tizimga Kirmaganlar uchun */}
							{!isSignedIn && (
								<Link
									href='/sign-in'
									className='ml-2 text-sm font-montserrat font-medium text-gray-500 hover:text-black transition-colors hidden sm:block shrink-0'
								>
									Kirish
								</Link>
							)}

							{/* Tizimga Kirganlar uchun (Avatar) */}
							{isSignedIn && (
								<div className='ml-2'>
									<UserMenu />
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</header>
	)
}

export default Navbar
