import { where } from 'sequelize';
import { User } from '../../models/user.js';
import { generateError } from '../../utils/generateError.js';

export async function registerUser(data) {
    try {
        console.log(data);
        const user = await User.create(data);

        if(!user) generateError('Error creating user', 500);

        return user;
    } catch (error) {
        console.log(error);
        generateError(error.message, error.status);
    }
}

export async function getUserByEmail(email) {
    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if(!user) generateError('User not found', 404);

        return user;
    } catch (error) {
        generateError(error.message, error.status);
    }
}

export async function getUsers(){
    try {
        const users = await User.findAll();

        if(!users) generateError('Users not found', 404);

        return users;
    } catch (error) {
        generateError(error.message, error.status);
    }
}

export async function updateUser(data, email){
    try {
        console.log(data);

        const [updatedRows] = await User.update(data, {
            where: {
                email: email
            }
        });

        if (updatedRows === 0) generateError('User not updated', 404);

        const newUser = getUserByEmail(email);
        
        return newUser;
    } catch (error) {
        generateError(error.message, error.status);
    }
}

export async function updateEmail(newEmail, email){
    try {

        const user = await User.update({email: newEmail}, {
            where: {
                email: email
            }
        });

        if(!user) generateError('Not update email', 404);

        const newUser = await User.findOne({
            where: {
                email: newEmail
            }
        });

        return newUser.email;
    } catch (error) {
        generateError(error.message, error.status);
    }
}

export async function updateUserImage(data, email){
    try {
        const user = await User.update(data, {
            where: {
                email: email
            }
        });

        if(!user) generateError('User not found', 404);

        return user;
    } catch (error) {
        generateError(error.message, error.status);
    }
}

export async function deleteUser(email){
    try {
        const user = await User.destroy({
            where: {
                email: email
            }
        });

        return user;
    } catch (error) {
        generateError(error.message, error.status);
    }
}