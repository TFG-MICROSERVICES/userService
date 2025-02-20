import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import database from './db/database.js';
import userRoutes from './routes/userRoutes.js';
import { EventEmitter } from 'events';

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

EventEmitter.defaultMaxListeners = 30;
app.use(express.json());
app.use(morgan('combined'));

app.use('/user', userRoutes);

//MIDDLEWARE FOR ROUTE NOT FOUND
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Route not found',
    });
});

//MIDDLEWARE FOR ERROR HANDLING
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
    });
});

database
    .sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
