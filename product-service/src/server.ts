import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import productRoutes from './routes/routes';
import { verifyToken } from './middlewares/auth-middleware';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());

// Verificar conexão com o banco de dados
prisma.$connect()
  .then(() => console.log('Conectado ao banco de dados'))
  .catch((error: any) => console.error('Erro ao conectar ao banco de dados', error));

// Middleware de autenticação para todas as rotas de produtos
app.use('/', verifyToken, productRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Product service is running' });
});

app.listen(PORT, () => {
  console.log(`Product service running on port ${PORT}`);
});