import express from 'express';
import {
    registerUserController,
    getUserByIdController,
    getUsersController,
    updateUserController,
    updateUserEmailController,
    deleteUserController,
} from '../controllers/userControllers.js';
import { validateApiKey } from '../middlewares/validateApiKey.js';

const router = express.Router();

router.post('/register', validateApiKey, registerUserController);

router.get('/:id', validateApiKey, getUserByIdController);

router.get('/', validateApiKey, getUsersController);

router.put('/:id', validateApiKey, updateUserController);

router.patch('/emil/:id', validateApiKey, updateUserEmailController);

router.delete('/:id', validateApiKey, deleteUserController);

export default router;
