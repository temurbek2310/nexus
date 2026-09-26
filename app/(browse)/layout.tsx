// import Footer from '@/components/shared/footer'
// import Navbar from '@/components/shared/navbar'
// import { ReactNode } from 'react'

// const BrowseLayout = ({ children }: { children: ReactNode }) => {
// 	return (
// 		<div className='flex min-h-screen flex-col bg-[#050505] text-gray-300 font-montserrat antialiased selection:bg-white/20'>
// 			<Navbar />

// 			{/* Asosiy content qismi */}
// 			<main className='flex-1 w-full max-w-7xl mx-auto px-6 md-px-12 py-10'>
// 				{children}
// 			</main>

// 			<Footer />
// 		</div>
// 	)
// }

// export default BrowseLayout
import Footer from '@/components/shared/footer'
import Navbar from '@/components/shared/navbar' // O'zingizning yo'lakchani to'g'rilab olasiz
import { ReactNode, Suspense } from 'react'

const BrowseLayout = ({ children }: { children: ReactNode }) => {
	return (
		// Vercel style: Oq fon, qora/to'q kulrang matnlar
		<div className='min-h-screen flex flex-col bg-white text-gray-900 font-montserrat selection:bg-black selection:text-white'>
			<Suspense>
				<Navbar />
			</Suspense>

			{/* Asosiy kontent. Vercel odatda max-w-7xl (1280px) ishlatadi */}
			<main className='grow w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16'>
				{children}
			</main>

			<Footer />
		</div>
	)
}

export default BrowseLayout
