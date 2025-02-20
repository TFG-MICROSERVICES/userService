import express from 'express';
import {
    registerUserController,
    getUserByEmailController,
    getUsersController,
    updateUserController,
    updateUserEmailController,
    deleteUserController,
} from '../controllers/userControllers.js';
import { validateApiKey } from '../middlewares/validateApiKey.js';

const router = express.Router();

router.post('/register', validateApiKey, registerUserController);

router.get('/:email', validateApiKey, getUserByEmailController);

router.get('/', validateApiKey, getUsersController);

router.put('/:email', validateApiKey, updateUserController);

router.patch('/email/:email', validateApiKey, updateUserEmailController);

router.delete('/:email', validateApiKey, deleteUserController);

export default router;
