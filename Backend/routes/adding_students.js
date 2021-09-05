const { Student, validate } = require('../models/add_student');
const { studentLogin } = require('../models/student_login');
const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
var generator = require('generate-password');

router.get('/', async (req, res) => {
  const students = await Student.find();
  res.send(students);
}); //get method ends here

async function generateUsername(firstname, lastname) {
  let username;
  username = "S" + '.' + firstname + lastname;
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

  let student = new Student({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phoneNo: req.body.phoneNo
  });

  //Saving a student in the Student collection
  student = await student.save();

  //Auto generations of username and password for the newly added student
  const student_username = await generateUsername(student.firstname, student.lastname);
  const student_password = await generatePassword();

  // Now save that student into the student_login database
  const studlog = new studentLogin({
    student_username: student_username,
    student_password: student_password
  });
  studentLogin.collection.insert(studlog);

  //Email the auto-generated username and password to that student
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'educy.official@gmail.com',
      pass: 'educy@123'
    }
  });

  var subjectForAll = 'EduCy Login Credentials';
  var textForAll = 'Hi ' + student.firstname + ',' + '.\nBelow are your login credentials for EduCy \n Username: ' + student_username + '\n Password: ' + student_password;

  var mailOptions = {
    from: 'educy.official@gmail.com',
    to: student.email,
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
  res.status(200).json({ status: "true", msg: "Successfully created the student." });
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
