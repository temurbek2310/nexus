import { auth } from '@clerk/nextjs/server'

const Page = async () => {
	await auth.protect()
	return <div>Page</div>
}

export default Page
