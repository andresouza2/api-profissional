import { Router } from 'express'
import { makeAuthController } from '../factories/make-auth-controller'

const profileRoutes = Router()

// profileRoutes.get('/me', (req, res) => {})
profileRoutes.post('/auth/login', makeAuthController())

export { profileRoutes }
