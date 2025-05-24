import { registerUser, getUserById, getUserByEmail, getUsers, updateUser, updateEmail, deleteUser, getUsersByArrayService } from '../db/services/userServices.js';
import { generateError } from '../utils/generateError.js';
import { updateUserSchema, userSchema } from '../schemas/userSchema.js';

export async function registerUserController(req, res, next) {
    try {
        const validate = await userSchema.validateAsync(req.body, { stripUnknown: true });

        const user = await registerUser(validate);

        res.status(201).json({
            status: 201,
            message: 'Usuario registrado correctamente',
            user,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export async function getUserByIdController(req, res, next) {
    try {
        const { user_id } = req.params;

        if (!user_id) generateError('User id is required', 400);

        const user = await getUserById(user_id);

        res.status(200).json({
            message: 'Usuario encontrado',
            user,
        });
    } catch (error) {
        next(error);
    }
}

export async function getUserByEmailController(req, res, next) {
    try {
        const { email } = req.body;

        if (!email) generateError('Email is required', 400);

        const user = await getUserByEmail(email);

        res.status(200).json({
            message: 'Usuario encontrado',
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
            message: 'Usuarios encontrados correctamente',
            users,
        });
    } catch (error) {
        next(error);
    }
}

export const getUsersByArrayController = async (req, res, next) =>{
    try{    
        const { data } = req.body;

        console.log(data);

        const users = await getUsersByArrayService(data);

        res.status(200).json({
            status: 200,
            message: 'Usuarios encontrados correctamente',
            data: users
        })
    }catch(error){
        next(error);
    }
}

export async function updateUserController(req, res, next) {
    try {
        const { email } = req.params;
        const validate = await updateUserSchema.validateAsync(req.body, { stripUnknown: true });

        const user = await updateUser(validate, email);

        res.status(200).json({
            status: 200,
            message: 'Perfil actualizado correctamente',
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
        const { email } = req.params;

        if (!email) generateError('Email es requerido', 400);

        await deleteUser(email);

        res.status(200).json({
            message: 'Usuario eliminado',
        });
    } catch (error) {
        next(error);
    }
}
