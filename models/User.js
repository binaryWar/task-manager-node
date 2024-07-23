const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        default: () => nanoid(),
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String
    },
    emailAddress: {
        type: String,
        required: [true, 'Email address is required'],
        unique: true,
        // validate: {
        //     validator: function(v) {
        //         return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        //     },
        //     message: 'Please enter a valid email address'
        // }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password should be at least 6 characters long']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

module.exports = mongoose.model('User', userSchema);
