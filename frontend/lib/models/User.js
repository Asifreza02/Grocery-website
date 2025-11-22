<<<<<<<< HEAD:frontend/models/User.js
========

>>>>>>>> 1c93cb6cac8ae5993db8d22b7574871e52e81600:frontend/lib/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.models.User || mongoose.model('User', userSchema);
