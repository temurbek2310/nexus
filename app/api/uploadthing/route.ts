import { createRouteHandler } from 'uploadthing/next'
import { ourFileRouter } from './core'

// Handler'ni alohida o'zgaruvchiga olamiz
const handlers = createRouteHandler({
	router: ourFileRouter,
})

// Turbopack to'g'ri tanishi uchun GET va POST ni alohida aniq eksport qilamiz
export const GET = handlers.GET
export const POST = handlers.POST
