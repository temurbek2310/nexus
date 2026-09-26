import { SignUp } from '@clerk/nextjs'
import { Suspense } from 'react'

export default function Page() {
	return (
		// Suspense Clerk formasi yuklangunicha aylanib turuvchi (spinner) ko'rsatadi
		<Suspense
			fallback={
				<div className='flex items-center justify-center h-64 w-full'>
					<div className='w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin'></div>
				</div>
			}
		>
			<SignUp />
		</Suspense>
	)
}
