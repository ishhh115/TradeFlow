import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import authRoutes from './routes/authRoutes'
import leadRoutes from './routes/leadRoutes'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger'

dotenv.config()

const app = express()

// Security
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
// Swagger docs
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { message: 'Too many requests, please try again later.' }
})
app.use('/api/', limiter)

// Routes (versioned)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/leads', leadRoutes)

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'TradeFlow API is running 🚀' })
})

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI || ''

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected ✅')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`)
    })
  })
  .catch((err) => {
    console.log('MongoDB connection failed ❌', err)
  })