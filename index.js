//npm packages
var cors = require('cors')
const mongoose = require('mongoose');
const express = require('express');
const app = express();

//routes
const students = require('./routes/adding_students');
const studentLog = require('./routes/students_logging');
const teachers = require('./routes/teachers');
const teacherLog = require('./routes/teachers_logging');
const subjects = require('./routes/adding_subject');
const course = require('./routes/adding_course');

//connecting to educy database
mongoose.connect('mongodb://localhost/educy')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoBD'));

//setting up middleware for educy application
app.use(cors());
app.use(express.json());
app.use('/api/students', students);
app.use('/api/students/login', studentLog);
app.use('/api/teachers', teachers);
app.use('/api/teachers/login', teacherLog);
app.use('/api/course/subject', subjects);
app.use('/api/course', course);

//defining port to run backend
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));