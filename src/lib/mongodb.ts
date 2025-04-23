// lib/mongodb.ts
import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    '❌ La variable de entorno MONGODB_URI no está definida en .env.local'
  );
}

// Definimos una interfaz para el objeto que vamos a guardar en global
interface MongooseGlobalCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extendemos el tipo globalThis para incluir mongoose
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseGlobalCache | undefined;
}

// Usamos una instancia global para cachear la conexión
const cached: MongooseGlobalCache = global.mongoose ?? {
  conn: null,
  promise: null,
};

global.mongoose = cached;

export async function connectToDatabase(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  cached.promise ??= mongoose.connect(MONGODB_URI, {
    dbName: 'portfolio',
    bufferCommands: false,
  });
  

  cached.conn = await cached.promise;
  return cached.conn;
}
