const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = mongoose.model('Student');

let connection = require('../models/db').connectDB();

router.get('/', (req, res) => {
    res.render('student/addOrEdit', {
        viewTitle: 'Insert Student'
    });
});

router.post('/', async (req, res) => {
   if (req.body._id === '') {
       await insertRecord(req, res);
   } else {
       await updateRecord(req, res);
   }
});

async function insertRecord(req, res) {
    let student = new Student();
    student.fullName = req.body.fullName;
    student.email = req.body.email;
    student.mobile = req.body.mobile;
    student.city = req.body.city;
    try {
        await student.save().then(() => {
            res.redirect('student/list');
        });
    } catch (err) {
        console.log('Error during insert student: ' + err);
    }
}

async function updateRecord(req, res) {
    try {
        await Student.findOneAndUpdate({_id: req.body._id}, req.body, {new: true})
            .then(() => {
                res.redirect('student/list')
            });
    } catch (err) {
        console.log('Error during update student: ' + err);
    }
}

router.get('/list/', async (req, res) => {
    try {
        await Student.find().then(function(docs) {
            res.render('student/list', {
                list: docs
            });
        });
    } catch (err) {
            console.log('Error in retrieving student list: ' + err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        await Student.findById(req.params.id).then(function(docs) {
            res.render('student/addOrEdit', {
                viewTitle: 'Update Student',
                student: docs
            });
        });
    } catch (err) {
        console.log('Error during retrieving student: ' + err);
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id).then(() => {
            res.render('student/list');
        });
    } catch (err) {
        console.log('Error during delete student: ' + err);
    }
});

module.exports = router;