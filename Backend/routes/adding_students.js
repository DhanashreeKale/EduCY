const { Student, validate } = require('../models/add_student');
const { studentLogin, validateStudentLogi } = require('../models/student_login');
const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
var generator = require('generate-password');
const mongoose = require('mongoose');
var db = mongoose.connection;

router.get('/', async (req, res) => {
  const students = await Student.find();
  res.send(students);
}); //get method ends here

router.post('/send', async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);

  let student = new Student({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phoneNo: req.body.phoneNo
  });

  student = await student.save();
  res.send(student);

  //The below function returns number of entries/ Students from the "Student" collection present in the database 
  async function numOfDocs() {
    const student = await Student
      .count();
    return student;
  }

  //The below function returns object of emails array of Students from the "Student" collection present in the database
  async function getEmails() {
    const studentEmails = await Student
      .find()
      .select({ email: 1, _id: 0 })
      .lean();
    return studentEmails;
  }

  async function getFirstName() {
    const studFirstName = await Student
      .find()
      .select({ firstname: 1, _id: 0 })
      .lean();
    return studFirstName;
  }

  async function getLastName() {
    const studLastName = await Student
      .find()
      .select({ lastname: 1, _id: 0 })
      .lean();
    return studLastName;
  }

  async function run() {
    var emails = await getEmails();
    var length = await numOfDocs();
    var first_name = await getFirstName();
    var last_name = await getLastName();
    var i;

    // var pass = generator.generateMultiple(length, {
    //   length: 8,
    //   uppercase: false,
    //   numbers:true
    // });

    // console.log(pass);

    for (i = 0; i < length; i++) {
      let username = [];
      let passwords = [];
      username[i] = "S" + '.' + first_name[i].firstname + last_name[i].lastname;
      passwords[i] = generator.generate({
        length: 8,
        uppercase: false,
        numbers: true
      });
      // console.log(passwords[i]);
      // try {
      //   let response = await studentLogin.create({
      //     student_username: username[i],
      //     student_password: passwords[i]
      //   })
      //   response = await response.save();
      //   res.send(response);
      // } catch (error) {
      //   console.log(error);
      // }
      //below code is working but with error
      console.log(username[i]);
      try {
        const studlog = new studentLogin({
          student_username: username[i],
          student_password: passwords[i]
        });
        studentLogin.collection.insert(studlog);

        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'educy.official@gmail.com',
            pass: 'educy@123'
          }
        });
        var subjectForAll = 'EduCy Login Credentials';
        var textForAll = 'Hi ' + first_name[i].firstname + '.\nBelow are your login credentials for Educy \n Username:' + username[i] + '\n Password:' + passwords[i];

        var mailOptions = {
          from: 'educy.official@gmail.com',
          to: emails[i].email, //console.log(emails[i].email); successfully works
          subject: subjectForAll,
          text: textForAll
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            res.send('emails are sent');
          }
        });
      }
      catch (error) {
        console.log(error);
      }
    }//for ends
  }//function run() ends

  run();
}); //post method ends here

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);

  const student = await Student.findByIdAndUpdate(req.params.id,
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phoneNo: req.body.phoneNo,
    }, { new: true });

  if (!student)
    return res.status(404).send('The student with the given ID was not found.');

  res.send(student);
}); //put method ends here

router.delete('/:id', async (req, res) => {
  const student = await Student.findByIdAndRemove(req.params.id);

  if (!student)
    return res.status(404).send('The student with the given ID was not found.');

  res.send(student);
}); //delete method ends here

router.get('/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student)
    return res.status(404).send('The student with the given ID was not found.');

  res.send(student);
}); // get by ID method ends here

module.exports = router;