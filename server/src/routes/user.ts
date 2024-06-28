import express from 'express';
const router = express.Router();
import checkAuth from '../middleware/check-auth.js';
import role from '../middleware/user-role.js';

import UserController from '../controllers/user.js'

router.get('/', checkAuth, UserController.getAll);

router.post('/signup', UserController.signup);

router.post("/login", UserController.login)

router.delete('/:id', checkAuth, role.userRole('admin'), UserController.deleteUser);

export default router;
