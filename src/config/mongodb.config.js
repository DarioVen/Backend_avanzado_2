import { connect } from 'mongoose';

export const initMongoDB = async () => {
    try {
        await connect('mongodb+srv://darioalev:hFvSNzeFkNEhyL1Q@cluster0.sivr8.mongodb.net/Backend-2')
        console.log('Conectado a MongoDB')
    } catch (error) {
        console.log(error)
        throw 'Error al conectar a la base de datos'
    }
};