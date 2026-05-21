import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import User from '../models/User'

// Generating JWT token for user authentication
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '7d' })
}

// Validation rules
export const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
]

export const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
]

// Register new user
export const register = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return
  }

  try {
    const { name, email, password, role } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'sales'
    })

    res.status(201).json({
      message: 'User registered successfully',
      token: generateToken(user._id.toString()),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// Login existing user
export const login = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return
  }

  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' })
      return
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' })
      return
    }

    res.status(200).json({
      message: 'Login successful',
      token: generateToken(user._id.toString()),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}