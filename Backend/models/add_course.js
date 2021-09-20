const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    course_name: {
        type: String,
        required: true,
        maxlength: 50
    },
    batchDetails: {
        year: {
            type: [String],
        },
        semester: {
            sem1: { type: [String] },
            sem2: { type: [String] },
            sem3: { type: [String] },
            sem4: { type: [String] }
        }   //semester ends here
    },     //batchDetails ends here
    totalSemesters: {
        type: Number,
        required:true
    },
    durationYears: {
        type: Number,
        required:true
    }
});

const Course = mongoose.model('Course', courseSchema);

function validateCourse(course) {
    const schema = {
        course_name: Joi.string().max(50).required(),
        totalSemesters: Joi.number().required(),
        durationYears:Joi.number().required()
    };

    return Joi.validate(course, schema);
}

exports.courseSchema = courseSchema;
exports.Course = Course;
exports.validate = validateCourse;
