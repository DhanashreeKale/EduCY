const {Teacher, validate} = require('../models/teacher');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res)=>{
    const teachers= await Teacher.find();
    res.send(teachers);
});

router.post('/', async(req, res)=>{
    const {error}=validate(req.body);
    if(error)
    return res.status(400).send(error.details[0].message);

    let teacher = new Teacher({
        name: req.body.name,
        email: req.body.email
    });

    teacher= await teacher.save();
    res.send(teacher);
});

router.put('/:id', async(req, res)=>{
    const {error} = validate(req.body);
    if(error)
    return res.status(400).send(error.details[0].message);

    const teacher = await Teacher.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            email: req.body.email
        },{new: true});

        if(!teacher)
        return res.status(404).send('The teacher with given ID was not found.');

        res.send(teacher);
});

router.delete('/:id',async(req,res)=>{
    const teacher = await Teacher.findByIdAndRemove(req.params.id);

    if(!teacher)
    res.status(404).send('The teacher with given ID was not found.');

    res.send(teacher);
});

router.get('/:id', async(req,res)=>{
    const teacher = await Teacher.findById(req.params.id);

    if(!teacher)
    return res.status(404).send('The teacher with given ID was not found.');

    res.send(teacher);
});

module.exports = router;