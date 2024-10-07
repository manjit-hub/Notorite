import mongoose from 'mongoose';
import dotenv from 'dotenv'; 
dotenv.config();

const DBConnection = async () => {
    const MONGO_URL = process.env.MONGODB_URI;
    // console.log(MONGO_URL);
    if(!MONGO_URL) {
        console.error('MONGODB_URL is not defined in environment variables');
        return;
    }

    try {
        await mongoose.connect(MONGO_URL);
        console.log("DB connection established");
    }
    catch(error) {
        console.log("Error while connecting to Mongo DB", error);
    }
};

export default DBConnection;