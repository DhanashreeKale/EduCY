const Joi = require('joi');
const mongoose = require('mongoose');

const Teacher = mongoose.model('Teacher', new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    lastname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 255,
        unique: true
    },
    phoneNo: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    }
}));

function validateTeacher(teacher) {
    const schema = {
        firstname: Joi.string().min(3).max(50).required(),
        lastname: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(10).max(255).required(),
        phoneNo: Joi.string().min(10).max(10).required()
    };

    return Joi.validate(teacher, schema);
}


exports.Teacher = Teacher;
exports.validate = validateTeacher;
