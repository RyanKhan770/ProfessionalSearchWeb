// Backend/routes/user.routes.js

import { Router } from 'express';
import { getAllUsers, getUserById, searchUsers } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// Get all users
router.get('/', authMiddleware, getAllUsers);

// Search users by username
router.get('/search', authMiddleware, searchUsers);

// Get user by ID
router.get('/:id', authMiddleware, getUserById);

export default router;