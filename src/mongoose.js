import mongoose from 'mongoose';
import HitApi from './models/hitApi.model';

mongoose.Promise = Promise;

mongoose.connection.on('error', (err) => {
    console.log('mongodb connection error');
    process.exit(-1);
});

mongoose.connection.on('open', (err) => {
    console.log('connected');
    
});

if(process.env.ENV === 'development') {
    mongoose.set('debug', true);
}

// connect to mongo
export const connectToMongo = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useFindAndModify: false,
        keepAlive: 1,
        useNewUrlParser: true,
        useCreateIndex: true,
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS,
        auth: { authSource: 'admin' }
    });

    return mongoose.connection;
};

export const getMongoConnection = () => mongoose.connection;

const models = { HitApi };
export default models;
