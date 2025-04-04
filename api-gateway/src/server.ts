import express from 'express'
import cors from 'cors'
import proxy from 'express-http-proxy'

const app = express()
const PORT = process.env.PORT || 3000

const AUTH_SERVICE_URL = 'http://localhost:3001'
const PRODUCT_SERVICE_URL = 'http://localhost:3002'

app.use(express.json())
app.use(cors())

// Proxy para o serviço de autenticação
app.use(
  '/api/auth',
  proxy(AUTH_SERVICE_URL, {
    proxyReqPathResolver: (req) => req.originalUrl.replace('/api/auth', ''),
    proxyReqOptDecorator: (options, req) => {
      options.headers = req.headers
      return options
    }
  })
)

// Proxy para o serviço de produtos
app.use(
  '/api/products',
  proxy(PRODUCT_SERVICE_URL, {
    proxyReqPathResolver: (req) => req.originalUrl.replace('/api/products', ''),
    proxyReqOptDecorator: (options, req) => {
      options.headers = req.headers
      return options
    }
  })
)

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API Gateway is running' })
})

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`)
})
