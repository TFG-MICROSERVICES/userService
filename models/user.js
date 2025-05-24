import { DataTypes } from 'sequelize';
import database from '../db/database.js';

export const User = database.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        main_sport_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            max: 255,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            max: 255,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            max: 255,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            max: 20,
        },
        birthdate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            max: 255,
        },
        autonomous_region: {
            type: DataTypes.STRING,
            allowNull: false,
            max: 255,
        },
    },
    {
        tableName: 'Users',
    }
);
