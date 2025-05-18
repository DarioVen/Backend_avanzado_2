import { connect } from 'mongoose';
import config from './config.js';

export const initMongoDB = async () => {
    try {
        await connect(config.mongoUrl)
        console.log('Conectado a MongoDB')
    } catch (error) {
        console.log(error)
        throw 'Error al conectar a la base de datos'
    }
};