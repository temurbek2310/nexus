import { auth } from '@clerk/nextjs/server'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const f = createUploadthing()

export const ourFileRouter = {
	categoryImage: f({
		image: { maxFileSize: '4MB', maxFileCount: 1 },
	})
		.middleware(async () => {
			const { userId } = await auth()
			if (!userId) throw new UploadThingError('Iltimos, tizimga kiring!')
			return { userId }
		})
		.onUploadComplete(async ({ file }) => {
			// file.url ni file.ufsUrl ga o'zgartirdik:
			return { url: file.ufsUrl }
		}),

	productImages: f({
		image: { maxFileSize: '4MB', maxFileCount: 10 },
	})
		.middleware(async () => {
			const { userId } = await auth()
			if (!userId) throw new UploadThingError('Iltimos, tizimga kiring!')
			return { userId }
		})
		.onUploadComplete(async ({ file }) => {
			// Bu yerda ham file.ufsUrl ga o'zgartirdik:
			return { url: file.ufsUrl }
		}),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
