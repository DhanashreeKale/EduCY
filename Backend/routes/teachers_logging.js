const { teacherLogin, validateTeacherLogin } = require('../models/teacher_login');
const express = require('express');
const router = express.Router();

router.get('/logs', async (req, res) => {
    const teachLog = await teacherLogin.find();
    res.send(teachLog);
});

router.post('/receive', async (req, res) => {
    const { error } = validateTeacherLogin(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let teachLog = new teacherLogin({
        teacher_username: req.body.teacher_username,
        teacher_password: req.body.teacher_password
    });

    const check = await teacherLogin.collection.findOne({ teacher_username: teachLog.teacher_username });
    if (!check)
        res.json({ status: "false", msg: "User doesn't exist." });
    else
        res.json({ status: "true", msg: "User login succesfull" });
});

router.put('/:id', async (req, res) => {
    const { error } = validateTeacherLogin(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const teachLog = await teacherLogin.findByIdAndUpdate(req.params.id,
        {
            teacher_username: req.body.teacher_username,
            teacher_password: req.body.teacher_password
        }, { new: true });

    if (!teachLog)
        return res.status(404).send('The teacher with the login info not found.');
    res.send(teachLog);
});

router.delete('/:id', async (req, res) => {
    const teachLog = await teacherLogin.findByIdAndRemove(req.params.id);

    if (!teachLog)
        return res.status(404).send('The teacher with the login info not found.');
    res.send(teachLog);
});

router.get('/:id', async (req, res) => {
    const teachLog = await teacherLogin.findById(req.params.id);

    if (!teachLog)
        return res.status(404).send('The teacher with the login info not found..');
    res.send(teachLog);
});

module.exports = router;