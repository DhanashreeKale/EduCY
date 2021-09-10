const { Subject, validate } = require('../models/add_subject');
const express = require('express');
const { Course } = require('../models/add_course');
const router = express.Router();

router.get('/display', async (req, res) => {
    const subjects = await Subject.find().sort('code');
    res.send(subjects);
});

router.post('/add', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let subjects = new Subject({
        code: req.body.code,
        name: req.body.name,
        state: req.body.state,
        kind: req.body.kind,
        credits: req.body.credits,
        semester: req.body.semester,
        course: req.body.course
    });
    subjects = await subjects.save();
    res.send(subjects);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const course = await Course.findById(req.body.courseId);
    if (!course)
        return res.status(400).json({ msg: "Invalid Course ID" });

    const subjects = await Subject.findByIdAndUpdate(req.params.id,
        {
            code: req.body.code,
            name: req.body.name,
            state: req.body.state,
            kind: req.body.kind,
            credits: req.body.credits,
            semester: req.body.semester,
            course: req.body.course
        }, { new: true });

    if (!subjects)
        return res.status(404).json({ msg: "Subject with entered Id not found" });

    res.send(subjects);
});

router.delete('/:id', async (req, res) => {
    const subjects = await Subject.findByIdAndRemove(req.params.id);

    if (!subjects)
        res.status(404).json({ msg: "Subject with entered Id not found" });

    res.send(subjects);
});

router.get('/:id', async (req, res) => {
    const subjects = await Subject.findById(req.params.id);

    if (!subjects)
        return res.status(404).json({ msg: "Subject with entered Id not found" });

    res.send(subjects);
});

module.exports = router;