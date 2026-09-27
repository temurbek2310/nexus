import Navbar from '@/app/dashboard/_components/Navbar'
import Sidebar from '@/app/dashboard/_components/Sidebar'
import { Suspense } from 'react'

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='flex min-h-screen w-full bg-[#fafafa]'>
			{/* Desktop Sidebar */}
			<div className='hidden w-64 shrink-0 border-r border-gray-100 bg-white md:block'>
				<Suspense fallback={<div className='h-full w-full bg-white' />}>
					<Sidebar />
				</Suspense>
			</div>

			{/* Main Content Area */}
			<div className='flex flex-1 flex-col'>
				<Suspense
					fallback={
						<header className='h-16 border-b border-gray-100 bg-white/70' />
					}
				>
					<Navbar />
				</Suspense>
				<main className='flex-1 overflow-y-auto p-6 md:p-8'>
					<div className='mx-auto max-w-5xl'>{children}</div>
				</main>
			</div>
		</div>
	)
}
