import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Configurar proxy para o serviço de autenticação
app.use('/api/auth', (req, res, next) => {
  console.log('Recebendo requisição para /api/auth:', req.method, req.body);
  next();
}, createProxyMiddleware({
  
  target: 'http://192.168.1.192:3001',
  changeOrigin: true,
}));

// Configurar proxy para o serviço de produtos
app.use('/api/products', createProxyMiddleware({
  target: 'http://192.168.1.192:3002',
  changeOrigin: true,
}));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API Gateway is running' });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});