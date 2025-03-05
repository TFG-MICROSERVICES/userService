import { registerUser, getUserById, getUsers, updateUser, updateEmail, deleteUser } from '../db/services/userServices.js';
import { generateError } from '../utils/generateError.js';
import { userSchema } from '../schemas/userSchema.js';

export async function registerUserController(req, res, next) {
    try {
        const validate = await userSchema.validateAsync(req.body, { stripUnknown: true });

        console.log('Validate', validate);

        const user = await registerUser(validate);

        res.status(201).json({
            message: 'User registered successfully',
            user,
        });
    } catch (error) {
        next(error);
    }
}

export async function getUserByIdController(req, res, next) {
    try {
        const { id } = req.params;

        if (!id) generateError('Id is required', 400);

        const user = await getUserById(id);

        res.status(200).json({
            message: 'User found',
            user,
        });
    } catch (error) {
        next(error);
    }
}

export async function getUsersController(req, res, next) {
    try {
        const { search } = req.query;
        const users = await getUsers(search);

        res.status(200).json({
            message: 'Users found',
            users,
        });
    } catch (error) {
        next(error);
    }
}

export async function updateUserController(req, res, next) {
    try {
        const { email } = req.params;
        const validate = await userSchema.validateAsync(req.body, { stripUnknown: true });

        if (!email) generateError('Email is required', 400);

        const user = await updateUser(validate, email);

        res.status(200).json({
            message: 'User updated',
            user,
        });
    } catch (error) {
        next(error);
    }
}

export async function updateUserEmailController(req, res, next) {
    try {
        const { id } = req.params;
        const { newEmail } = req.body;

        if (!id) generateError('Id is required', 400);
        if (!newEmail) generateError('New email is required', 400);

        const user = await updateEmail(newEmail, id);

        res.status(200).json({
            message: 'Email updated',
            user,
        });
    } catch (error) {
        next(error);
    }
}

export async function updateUserPasswordController(req, res, next) {
    try {
        const { id } = req.params;
        const { password } = req.body;

        if (!id) generateError('Id is required', 400);
        if (!password) generateError('Password is required', 400);

        const user = await updateUserPassword(password, id);

        res.status(200).json({
            message: 'Password updated',
            user,
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteUserController(req, res, next) {
    try {
        const { id } = req.params;

        if (!id) generateError('Id is required', 400);

        await deleteUser(id);

        res.status(200).json({
            message: 'User deleted',
        });
    } catch (error) {
        next(error);
    }
}
