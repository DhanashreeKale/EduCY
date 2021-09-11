const Joi = require('joi');
const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    state: { //active=true, inactive=false
        type: String,
        enum: ['active', 'inactive'],
        required: true,
    },
    kind: { //compulsory or elective
        type: String,
        enum: ['compulsory', 'elective'],
        required: true
    },
    credits: {
        type: Number,
        min: 0,
        max: 4,
        required: true,
    },
    semester: {
        type: Number,
        min: 1,
        max: 6,
        required: true
    },
    course: {
        type: String,
        required: true
    }
});

const Subject = mongoose.model('Subject', subjectSchema);

function validateSubject(subject) {
    const schema = {
        code: Joi.string().required(),
        name: Joi.string().required(),
        state: Joi.string().required(),
        kind: Joi.string().required(),
        credits: Joi.number().min(0).max(4).required(),
        semester: Joi.number().min(1).max(6).required(),
        course: Joi.string().required()
    };

    return Joi.validate(subject, schema);
}

exports.subjectSchema = subjectSchema;
exports.Subject = Subject;
exports.validate = validateSubject;