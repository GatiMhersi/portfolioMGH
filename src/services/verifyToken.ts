import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongodb'; // o donde tengas tu función de conexión
import User from '@/models/User'; // Asegurate que esté bien el path
const JWT_SECRET = process.env.JWT_SECRET!;

export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    // Verifica el token
    const decoded = jwt.verify(token, JWT_SECRET) as { _id: string };

    // Asegura conexión a la DB
    await connectToDatabase();

    // Busca el usuario por ID
    const user = await User.findById(decoded._id);

    // Si existe el usuario, el token es válido
    return !!user;
  } catch (err) {
    console.error(err)
    return false;
  }
};
