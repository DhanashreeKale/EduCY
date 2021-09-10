const Joi = require('joi');
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    course_name: {
        type: String,
        required: true,
        maxlength: 50
    },
    batchDetails: [{
        year: {
            type: String,
            required: true
        }
    }]
});

const Course = mongoose.model('Course', courseSchema);

function validateCourse(course) {
    const schema = {
        course_name: Joi.string().max(50).required(),
    };

    return Joi.validate(course, schema);
}

exports.courseSchema = courseSchema;
exports.Course = Course;
exports.validate = validateCourse;