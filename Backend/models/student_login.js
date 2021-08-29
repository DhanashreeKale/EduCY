const Joi = require('joi');
const mongoose = require('mongoose');

const studentLogin = mongoose.model('studentLogin', new mongoose.Schema({
        student_username:{
            type: String,
            required: true,
            unique: true
        },

        student_password:{
            type: String,
            required: true,
            unique: true 
        }        
}));

function validateStudentLogin(student){
    const schema= {
        student_username: Joi.string().required(),
        student_password: Joi.string().required(),
    };

    return Joi.validate(student,schema);
}

exports.studentLogin = studentLogin;
exports.validateStudentLogin = validateStudentLogin;