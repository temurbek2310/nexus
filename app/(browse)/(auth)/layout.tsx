import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='flex min-h-screen w-full bg-[#FAFAFA]'>
			{/* ================= CHAP TOMON: BRENDING VA DIZAYN (Faqat kompyuterda ko'rinadi) ================= */}
			<div className='hidden lg:flex w-1/2 bg-[#050505] flex-col justify-between p-12 relative overflow-hidden'>
				{/* Vercel Engineering Grid Fon */}
				<div className='absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none'></div>

				{/* Orqa fon nur effekti */}
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] pointer-events-none'></div>

				{/* Yuqori qism: Logo */}
				<div className='relative z-20'>
					<Link
						href='/'
						className='font-space-grotesk text-3xl font-bold tracking-tighter text-white hover:opacity-80 transition-opacity'
					>
						NEXUS.
					</Link>
				</div>

				{/* Pastki qism: Iqtibos yoki Shior */}
				<div className='relative z-20 mt-auto'>
					<blockquote className='space-y-4'>
						<p className='text-2xl font-montserrat font-medium text-white leading-relaxed text-balance'>
							"Texnologiya va san'atning mukammal uyg'unligi. Eng ilg'or
							qurilmalar endi sizning xizmatingizda."
						</p>
						<footer className='text-sm font-space-grotesk tracking-widest text-gray-400 uppercase'>
							NEXUS Jamoasi
						</footer>
					</blockquote>
				</div>
			</div>

			{/* ================= O'NG TOMON: CLERK FORMASI ================= */}
			<div className='flex flex-col w-full lg:w-1/2 items-center justify-center p-6 sm:p-12 relative'>
				{/* Mobil qurilmalar uchun Logo (Kichik ekranda ko'rinadi) */}
				<div className='absolute top-8 left-8 lg:hidden'>
					<Link
						href='/'
						className='font-space-grotesk text-2xl font-bold tracking-tighter text-black'
					>
						NEXUS.
					</Link>
				</div>

				{/* Bosh sahifaga qaytish tugmasi */}
				<Link
					href='/'
					className='absolute top-8 right-8 flex items-center gap-2 font-montserrat text-sm font-medium text-gray-500 hover:text-black transition-colors'
				>
					<ArrowLeft className='w-4 h-4' />
					<span className='hidden sm:inline'>Bosh sahifaga qaytish</span>
				</Link>

				{/* Clerk Komponentlari (SignIn / SignUp) shu yerga tushadi */}
				<div className='w-full max-w-[400px] flex items-center justify-center'>
					{children}
				</div>
			</div>
		</div>
	)
}
