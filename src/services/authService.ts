// services/authService.ts
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongodb'

const JWT_SECRET = process.env.JWT_SECRET! as string;;


export const registerUser = async (email: string, password: string) => {
    await connectToDatabase()
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('El correo ya está en uso');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return {
    user: {
      _id: newUser._id,
      email: newUser.email,
    },
  };
};


export const loginUser = async (email: string, password: string) => {
  await connectToDatabase();

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Contraseña incorrecta');
  }

  const token = jwt.sign({ _id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: '7d',
  });

  return {
    user: {
      _id: user._id,
      email: user.email,
    },
    token,
  };
};

