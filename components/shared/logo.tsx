import Link from 'next/link'

const Logo = () => {
	return (
		<>
			{/* Logo (Vercel uslubidagi uchburchak va matn) */}
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
			</Link>
		</>
	)
}

export default Logo
