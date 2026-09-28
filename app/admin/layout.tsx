import AdminNavbar from './_components/AdminNavbar'
import AdminSidebar from './_components/AdminSidebar'

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='min-h-screen bg-gray-50/30 flex'>
			{/* Chap Sidebar */}
			<AdminSidebar />

			{/* O'ng Asosiy Qism (Navbar + Sahifa kontenti) */}
			<div className='flex-1 flex flex-col min-w-0'>
				<AdminNavbar />
				<main className='flex-1 p-6 lg:p-10 max-w-[1400px] w-full mx-auto'>
					{children}
				</main>
			</div>
		</div>
	)
}
