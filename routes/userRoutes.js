import express from 'express';
import {
    registerUserController,
    getUserByIdController,
    getUsersController,
    updateUserController,
    updateUserEmailController,
    deleteUserController,
    getUserByEmailController,
    getUsersByArrayController,
} from '../controllers/userControllers.js';
import { validateApiKey } from '../middlewares/validateApiKey.js';

const router = express.Router();

//GET http://localhost:3002/user
router.get('/', validateApiKey, getUsersController);

//GET http://localhost:3002/user/:user_id
router.get('/:user_id', validateApiKey, getUserByIdController);

//POST http://localhost:3002/user/register
router.post('/register', validateApiKey, registerUserController);

//POST http://localhost:3002/user/email
router.post('/email', validateApiKey, getUserByEmailController);

//POST http://localhost:3002/user/byArray
router.post('/byArray', validateApiKey, getUsersByArrayController);

//PUT http://localhost:3002/user/:email
router.put('/:email', validateApiKey, updateUserController);

//PATCH http://localhost:3002/user/email/:id
router.patch('/email/:id', validateApiKey, updateUserEmailController);

//DELETE http://localhost:3002/user/:email
router.delete('/:email', validateApiKey, deleteUserController);

export default router;
