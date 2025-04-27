import express from 'express';
import {
    registerUserController,
    getUserByIdController,
    getUsersController,
    updateUserController,
    updateUserEmailController,
    deleteUserController,
    getUserByEmailController,
} from '../controllers/userControllers.js';
import { validateApiKey } from '../middlewares/validateApiKey.js';

const router = express.Router();

router.post('/register', validateApiKey, registerUserController);

router.get('/:user_id', validateApiKey, getUserByIdController);

router.post('/email', validateApiKey, getUserByEmailController);

router.get('/', validateApiKey, getUsersController);

router.put('/:email', validateApiKey, updateUserController);

router.patch('/email/:id', validateApiKey, updateUserEmailController);

router.delete('/:email', validateApiKey, deleteUserController);

export default router;
