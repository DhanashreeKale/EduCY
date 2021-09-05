const Joi = require('joi');
const mongoose = require('mongoose');

const teacherLogin = mongoose.model('teacherLogin', new mongoose.Schema({
    teacher_username: {
        type: String,
        required: true,
        unique: true
    },

    teacher_password: {
        type: String,
        required: true,
        unique: true
    }
}));

function validateTeacherLogin(teacher) {
    const schema = {
        teacher_username: Joi.string().required(),
        teacher_password: Joi.string().required(),
    };

    return Joi.validate(teacher, schema);
}

exports.teacherLogin = teacherLogin;
exports.validateTeacherLogin = validateTeacherLogin;