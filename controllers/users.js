const express = require('express');
const router = express.Router();

const User = require('../models/User.js');
const Photo = require('../models/Photo.js');

// New route
router.get('/new', (req, res) => {
    res.render('users/new.ejs');
})

// Create route
router.post('/', (req, res) => {
    User.create(req.body, (err, createdUser) => {
        res.redirect('/users');
    })
})

// Index route
router.get('/', (req, res) => {
    User.find({}, (err, foundUsers) => {
        res.render('users/index.ejs', {
            users: foundUsers
        });
    })
})

// Show route
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        Photo.find({ user: foundUser._id }, (err, allPhotos) => {
            res.render('users/show.ejs', {
                users: foundUser,
                photos: allPhotos
            })
        }) 
    })
})

// Edit route
router.get('/:id/edit', (req, res) => {
	User.findById(req.params.id, (err, foundUser) => {
		res.render('users/edit.ejs', {
			users: foundUser
		});
	});
});

// Put route
router.put('/:id', (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedUser) => {
		res.redirect(`/users/${updatedUser._id}`);
	});
});

// Delete route
router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
        Photo.deleteMany({ user_id: deletedUser._id }, (err, deletedPhotos) => { 
            res.redirect('/users');
        })
    })
})

module.exports = router;