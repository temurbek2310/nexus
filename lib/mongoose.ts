import dns from 'dns'
import mongoose, { Mongoose } from 'mongoose'

// Windows va mahalliy tarmoqlarda MongoDB Atlas SRV rekordlarini resolve qilishda
// uchraydigan "querySrv ECONNREFUSED" xatoligini oldini olish
try {
	dns.setServers(['8.8.8.8', '8.8.4.4'])
} catch {
	// Muhit ruxsat bermasa e'tiborsiz qoldiriladi
}

const MONGODB_URI = process.env.MONGODB_URI

interface MongooseConnection {
	conn: Mongoose | null
	promise: Promise<Mongoose> | null
}

declare global {
	var mongoose: MongooseConnection | undefined
}

const cached: MongooseConnection = global.mongoose || {
	conn: null,
	promise: null,
}

if (!global.mongoose) {
	global.mongoose = cached
}

export const connectToDatabase = async () => {
	if (cached.conn) return cached.conn

	if (!MONGODB_URI) throw new Error('MONGODB_URI .env faylida topilmadi')

	cached.promise =
		cached.promise ||
		mongoose.connect(MONGODB_URI, {
			dbName: 'nexus',
			bufferCommands: false,
		})

	cached.conn = await cached.promise
	return cached.conn
}
