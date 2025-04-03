import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_jwt';

export const registerUser = async (email: string, password: string, name: string) => {
  // Verificar se o usuário já existe
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw new Error('Usuário já existe');
  }

  // Hash da senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Criar usuário
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name
    },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true
    }
  });

  return {
    success: true,
    user
  };
};

export const loginUser = async (email: string, password: string) => {
  // Buscar usuário
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    return {
      success: false,
      message: 'Usuário não encontrado'
    };
  }

  // Verificar senha
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return {
      success: false,
      message: 'Senha incorreta'
    };
  }

  // Gerar token JWT
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return {
    success: true,
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  };
};