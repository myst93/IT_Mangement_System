const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {
        type: String,
        enum: ['IT_Admin', 'IT_Personnel'],
        required: true,
    },
    fullName: {type: String, required: true},
    designation: {type: String, required: true},
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;