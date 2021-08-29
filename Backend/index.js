
const mongoose = require('mongoose');
const express = require('express');
const students = require('./routes/adding_students');
const studentLog = require('./routes/students_logging');
const teachers = require ('./routes/teachers');
const app = express();

mongoose.connect('mongodb://localhost/educy')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/students',students);
app.use('/api/students/login',studentLog);
app.use('/api/teachers',teachers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
