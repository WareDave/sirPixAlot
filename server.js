const express = require('express');
const app = express();
const port = 3000;
const methodOverride = require('method-override');
require('./db/db.js');

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));


const photoController = require('./controllers/photos.js');
app.use('/photos', photoController);
const userController = require('./controllers/users.js');
app.use('/users', userController);

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.listen(port, () => {
    console.log('MongoDB is Creeping')
});