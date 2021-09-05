const { Teacher, validate } = require('../models/teacher');
const { teacherLogin } = require('../models/teacher_login');
const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
var generator = require('generate-password');

router.get('/', async (req, res) => {
    const teachers = await Teacher.find();
    res.send(teachers);
}); //get method ends here

async function generateUsername(firstname, lastname) {
    let username;
    username = "T" + '.' + firstname + lastname;
    return username;
}

async function generatePassword() {
    let password;
    password = generator.generate({
        length: 8,
        uppercase: false,
        numbers: true
    });
    return password;
}

router.post('/send', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let teacher = new Teacher({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phoneNo: req.body.phoneNo
    });

    //Saving a teacher in the Teacher collection
    teacher = await teacher.save();

    //Auto generations of username and password for the newly added teacher
    const teacher_username = await generateUsername(teacher.firstname, teacher.lastname);
    const teacher_password = await generatePassword();

    // Now save that teacher into the teacher_login database
    const teachlog = new teacherLogin({
        teacher_username: teacher_username,
        teacher_password: teacher_password
    });
    teacherLogin.collection.insert(teachlog);

    //Email the auto-generated username and password to that teacher
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'educy.official@gmail.com',
            pass: '******'
        }
    });

    var subjectForAll = 'EduCy Login Credentials';
    var textForAll = 'Hi ' + teacher.firstname + ',\nBelow are your login credentials for EduCy \n Username:' + teacher_username + '\n Password:' + teacher_password;

    var mailOptions = {
        from: 'educy.official@gmail.com',
        to: teacher.email,
        subject: subjectForAll,
        text: textForAll
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.status(200).json({ status: "true", msg: "Successfully created the teacher." });
}); //post method ends here

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const teacher = await Teacher.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            email: req.body.email
        }, { new: true });

    if (!teacher)
        return res.status(404).send('The teacher with given ID was not found.');

    res.send(teacher);
}); //put method ends here

router.delete('/:id', async (req, res) => {
    const teacher = await Teacher.findByIdAndRemove(req.params.id);

    if (!teacher)
        res.status(404).send('The teacher with given ID was not found.');

    res.send(teacher);
}); //delete by ID ends here

router.get('/:id', async (req, res) => {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher)
        return res.status(404).send('The teacher with given ID was not found.');

    res.send(teacher);
});//get by Id ends here

module.exports = router;
