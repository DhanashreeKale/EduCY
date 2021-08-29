const Joi = require('joi');
const mongoose = require('mongoose');

const Teacher= mongoose.model('Teacher', new mongoose.Schema({
    name: {
        type: String,
        reuqired: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    
    }
}));

function validateTeacher(teacher){
    const schema={
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(teacher,schema);
}

exports.Teacher = Teacher;
exports.validate = validateTeacher;