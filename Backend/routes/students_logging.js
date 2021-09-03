const { studentLogin, validateStudentLogin } = require('../models/student_login');
const express = require('express');
const router = express.Router();

router.get('/logs', async (req, res) => {
    const studLog = await studentLogin.find();
    res.send(studLog);
});


router.post('/receive', async (req, res) => {
    const { error } = validateStudentLogin(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let studLog = new studentLogin({
        student_username: req.body.student_username,
        student_password: req.body.student_password
    });

    const check = await studentLogin.collection.findOne({ student_username: studLog.student_username });
    if (!check)
        res.json({ status: "false", msg: "User doesn't exist." });
    else
        res.json({ status: "true", msg: "User login succesfull" });
});

router.put('/:id', async (req, res) => {
    const { error } = validateStudentLogin(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const studLog = await studentLogin.findByIdAndUpdate(req.params.id,
        {
            student_username: req.body.student_username,
            student_password: req.body.student_password
        }, { new: true });

    if (!studLog)
        return res.status(404).send('The student with the login info not found.');

    res.send(studLog);
});

router.delete('/:id', async (req, res) => {
    const studLog = await studentLogin.findByIdAndRemove(req.params.id);

    if (!studLog)
        return res.status(404).send('The student with the login info not found.');

    res.send(studLog);
});

router.get('/:id', async (req, res) => {
    const studLog = await studentLogin.findById(req.params.id);

    if (!studLog)
        return res.status(404).send('The student with the login info not found..');

    res.send(studLog);
});

module.exports = router;
