import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/routes';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// Verificar conexão com o banco de dados
prisma.$connect()
  .then(() => console.log('Conectado ao banco de dados'))
  .catch((error) => console.error('Erro ao conectar ao banco de dados', error));

// Rotas
app.use('/', authRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Auth service is running' });
});

app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});