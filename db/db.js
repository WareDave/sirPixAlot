const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost/photosite';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

mongoose.connection.on('connected', () => {
    console.log(`Mongoose is Ready To Boogie ${connectionString}`);
})

mongoose.connection.on('disconnected', () => {
    console.log(`Spam Eggs Spam And Spam`);
})

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose Fucking Hates You: ${err}`);
})