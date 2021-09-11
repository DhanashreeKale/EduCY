const { Course, validate } = require('../models/add_course');
const express = require('express');
const router = express.Router();

router.get('/display', async (req, res) => {
    const courses = await Course.find().sort('course_name');
    res.send(courses);
});//get method ends here

router.post('/add', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let course = new Course({
        course_name: req.body.course_name,
    });
    course = await course.save();
    res.send(course);
});//post method ends here

router.post('/batch', async (req, res) => {

    const batchDetails = await Course.updateOne({ _id: req.body.courseId }, {
        $push: {
            batchDetails: [{
                year: req.body.year,
                semester: [{
                    sem1: req.body.sem1,
                    sem2: req.body.sem2,
                    sem3: req.body.sem3,
                    sem4: req.body.sem4,
                }]
            }]
        }
    });
    res.json({ msg: "Batch added successfully" });
});//post method ends here

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const course = await Course.findByIdAndUpdate(req.params.id,
        {
            course_name: req.body.course_name
        }, { new: true });

    if (!course)
        return res.status(404).json({ msg: "The course with the given Id was not found" });

    res.send(course);
});//put method ends here

router.delete('/:id', async (req, res) => {
    const course = await Course.findByIdAndRemove(req.params.id);

    if (!course)
        return res.status(404).json({ msg: "The course with the given Id was not found" });

    res.send(course);
});//delete method ends here

router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (!course)
        return res.status(404).json({ msg: "The course with the given Id was not found" });

    res.send(course);
});//get by Id method ends here
module.exports = router;
