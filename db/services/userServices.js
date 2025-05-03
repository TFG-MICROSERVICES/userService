import { Op, where } from 'sequelize';
import { User } from '../../models/user.js';
import { generateError } from '../../utils/generateError.js';

export async function registerUser(data) {
    try {
        const user = await User.create(data);

        if (!user) generateError('Error creating user', 500);

        return user;
    } catch (error) {
        console.log(error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            const field = error.errors[0].path;
            const fieldMessages = {
                email: 'Este correo electrónico ya está registrado',
                phone_number: 'Este número de teléfono ya está registrado',
                // Añade otros campos únicos según sea necesario
            };
            generateError(fieldMessages[field] || `El campo ${field} ya existe`, 400);
        } else {
            throw error;
        }
    }
}

export async function getUserById(userId) {
    try {
        const user = await User.findByPk(userId, {
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt'],
            },
        });

        if (!user) generateError('User not found', 404);

        return user;
    } catch (error) {
        generateError(error.message, error.status);
    }
}

export async function getUserByEmail(email) {
    try {
        const user = await User.findOne({
            where: { email },
        });

        if (!user) generateError('User not found', 404);

        return user;
    } catch (error) {
        generateError(error.message, error.status);
    }
}

export async function getUsers(search = null) {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt'],
            },
            where: search
                ? {
                      [Op.or]: [
                          { name: { [Op.like]: `%${search}%` } },
                          { lastName: { [Op.like]: `%${search}%` } },
                          { email: { [Op.like]: `%${search}%` } },
                          { phone_number: { [Op.like]: `%${search}%` } },
                      ],
                  }
                : {},
        });

        if (!users) generateError('Users not found', 404);

        return users;
    } catch (error) {
        generateError(error.message, error.status);
    }
}

export const getUsersByArrayService = async (data) => {
    try {
        const userIds = data.map(obj => obj.user_email);

        const users = await User.findAll({
            where: {
                email: {
                    [Op.in]: userIds
                }
            },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt'],
            },
        });

        return users;
    } catch (error) {
        throw error;
    }
}

export async function updateUser(data, email) {
    try {
        const [updatedRows] = await User.update(data, {
            where: {
                email: email,
            },
        });

        if (updatedRows === 0) generateError('User not updated', 404);

        return true;
    } catch (error) {
        generateError(error.message, error.status);
    }
}

export async function updateEmail(newEmail, id) {
    try {
        const user = await User.update(
            { email: newEmail },
            {
                where: {
                    id: id,
                },
            }
        );

        if (!user) generateError('Not update email', 404);

        const newUser = await getUserById(id);

        return newUser.email;
    } catch (error) {
        generateError(error.message, error.status);
    }
}

export async function deleteUser(email) {
    try {
        const user = await User.destroy({
            where: {
                email: email,
            },
        });

        return user;
    } catch (error) {
        generateError(error.message, error.status);
    }
}
