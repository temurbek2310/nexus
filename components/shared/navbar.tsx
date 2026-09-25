import Link from 'next/link'
import Logo from './logo'

const Navbar = () => {
	return (
		<header className='fixed top-0 left-0 w-full z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between'>
				<div className='flex items-center gap-8'>
					{/* Logo (Vercel uslubidagi uchburchak va matn)
					<Link
						href='/'
						className='font-space-grotesk text-lg font-bold tracking-tight text-black flex items-center gap-2'
					>
						<svg
							height='22'
							viewBox='0 0 76 65'
							fill='black'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path d='M37.5274 0L75.0548 65H0L37.5274 0Z' />
						</svg>
						NEXUS
					</Link> */}
					<Logo />

					{/* Menyu linklari: Och kulrang, hoverda qora */}
					<nav className='hidden md:flex items-center gap-6 font-montserrat text-sm font-medium text-gray-500'>
						<Link href='/browse' className='hover:text-black transition-colors'>
							Katalog
						</Link>
						<Link
							href='/collections'
							className='hover:text-black transition-colors'
						>
							Kolleksiyalar
						</Link>
						<Link href='/about' className='hover:text-black transition-colors'>
							Biz haqimizda
						</Link>
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
