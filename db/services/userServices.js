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
        generateError(error.message, error.status);
    }
}

export async function getUserById(id) {
    try {
        const user = await User.findByPk(id);

        if (!user) generateError('User not found', 404);

        return user;
    } catch (error) {
        generateError(error.message, error.status);
    }
}

export async function getUsers(search = null) {
    try {
        const users = await User.findAll({
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

export async function updateUser(data, id) {
    try {
        console.log(data);

        const [updatedRows] = await User.update(data, {
            where: {
                id: id,
            },
        });

        if (updatedRows === 0) generateError('User not updated', 404);

        const newUser = getUserById(id);

        return newUser;
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

export async function deleteUser(id) {
    try {
        const user = await User.destroy({
            where: {
                id: id,
            },
        });

        return user;
    } catch (error) {
        generateError(error.message, error.status);
    }
}
