const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
    title: String,
    url: String,
    description: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;