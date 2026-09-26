import mongoose, { Mongoose } from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

interface MongooseConnection {
	conn: Mongoose | null
	promise: Promise<Mongoose> | null
}

declare global {
	// eslint-disable-next-line no-var
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
