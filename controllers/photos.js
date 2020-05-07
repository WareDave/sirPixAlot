const express = require('express');
const router = express.Router();

const Photo = require('../models/Photo.js');
const User = require('../models/User.js');

router.get('/new', async (req, res) => {
    try {
        const allUsers = await User.find();
        res.render('photos/new.ejs', {
            users: allUsers
        })
    } catch(err) {
        res.send(err);
    }
})

router.post('/', async(req, res) => {
    try {
        await Photo.create(req.body)
        res.redirect('/photos');
    } catch(err) {
        res.send(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const foundPhotos = await Photo.find({});
        res.render('photos/index.ejs', {
            photos: foundPhotos
        });
    } catch(err) {
        res.send(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const foundPhoto = await Photo.findById(req.params.id).populate('User');
        console.log(foundPhoto);
        res.render('photos/show.ejs', {
            photos: foundPhoto
        })
    } catch(error) {
        res.send(error)
    }
})

router.get('/:id/edit', async (req, res) => {
    try {
        const foundPhoto =  await Photo.findById(req.params.id);
        const allUsers = await User.find();
        res.render('photos/edit.ejs', {
            photos: foundPhoto,
            users: allUsers
        })
    } catch(err) {
        res.send(err);
    }
});

router.put('/:id', async(req, res) => {
    try {
        await Photo.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/photos');
    } catch(error){
        res.send(error)
    }
});

// Delete route
router.delete('/:id', (req, res) => {
    try {
        Photo.findByIdAndRemove(req.params.id, () => {
            res.redirect('/photos');
        })
    } catch(err) {
        res.send(err);
    }
});

module.exports = router;