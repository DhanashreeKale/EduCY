const { Course, validate } = require('../models/add_course');
const express = require('express');
const router = express.Router();
const {Subject}  = require('../models/add_subject');

//getting all the courses present
router.get('/display', async (req, res) => {
    const courses = await Course.find().select({course_name:1}).sort('course_name');
    res.send(courses);
});

//adding a new course to the Course collection
router.post('/add', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let course = new Course({
        course_name: req.body.course_name,
        totalSemesters: req.body.totalSemesters,
        durationYears: req.body.durationYears
    });
    course = await course.save();
    res.send(course);
});

//adding a batch( batch's year) of a course by passing the courseID
router.post('/batch/add', async (req, res) => {

    const course = await Course.findOne({ _id: req.body.courseId });
    if (!course)
        return res.status(404).json({ msg: "Course not found" });

    course.batchDetails.year.push(req.body.year);
    
    await course.save();
    res.json({ msg: "Batch added successfully" });
});

//adding subject codes from subject collection, into the semester array defined in Course collection
router.post('/semester/add', async (req, res) => {
    const course = await Course.findOne({ _id: req.body.courseId });
    if (!course)
        return res.status(404).json({ msg: "Course not found" });

    var yearIndex = course.batchDetails.year.indexOf(req.body.year);
    if (yearIndex == -1)
        return res.status(404).json({ msg: "Batch( Year) not found" });
    
    console.log(yearIndex);

    const subjects = await Subject.find()
        .and([{ course: course.course_name }, { semester: req.body.semester }])
        .select({ code: 1, _id: 0 });
    if (!subjects)
        return res.status(404).json({ msg: "Subject not found" });

    var sub = subjects.map(subjects => subjects.code);

    var sem = req.body.semester;


    const addSem = await Course.updateMany({ _id: req.body.courseId }, {
        $push: {
            "sem2": {
                $each: [ sub ],
                $position: yearIndex
            }
        }
    });
    // if (sem == 1)
    //     course.batchDetails.semester.sem1.splice(3,0,sub);
    // else if (sem == 2)
    //     course.batchDetails.semester.sem2.splice(3,0,sub);
    // else if (sem == 3)
    //     course.batchDetails.semester.sem3.splice(yearIndex,0,sub);
    // else if (sem == 4)
    //     course.batchDetails.semester.sem1.splice(yearIndex,0,sub);
    // else
    //     return res.status(404).json({ msg: "Invalid semester" });
    await course.save();
    res.send(sub);
});

//getting all the batches(year) under a course
router.post('/batch/display', async (req, res,) => {
    var batchYear = await Course.findById({ _id: req.body.courseId })
        .select({ 'batchDetails.year': 1, _id: 0 }).lean();
    res.send(batchYear);
    console.log(batchYear);
});

//Deleting a batch(year) under course
router.post('/batch/delete', async (req, res) => {
    const course = await Course.findOne({ _id: req.body.courseId });
    if (!course)
        return res.status(404).json({ msg: "Course not found" });
    
    var yearIndex = course.batchDetails.year.indexOf(req.body.year);
    if (yearIndex == -1)
        return res.status(404).json({ msg: "Batch (Year) not found" });

    course.batchDetails.year.remove(req.body.year);
    await course.save();
    res.json({ msg: "Batch deleted successfully" });
});

//Updating a particular course by its ID
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const course = await Course.findByIdAndUpdate(req.params.id,
        {
            course_name: req.body.course_name,
            totalSemesters: req.body.totalSemesters,
            durationYears: req.body.durationYears
        }, { new: true });

    if (!course)
        return res.status(404).json({ msg: "The course with the given Id was not found" });

    res.send(course);
});

//deleting a particular Course by its ID
router.delete('/:id', async (req, res) => {
    const course = await Course.findByIdAndRemove(req.params.id);

    if (!course)
        return res.status(404).json({ msg: "The course with the given Id was not found" });

    res.send(course);
});

//getting a particular course by its ID
router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (!course)
        return res.status(404).json({ msg: "The course with the given Id was not found" });

    res.send(course);
});

module.exports = router;
