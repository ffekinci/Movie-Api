const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://movie_user:api2019@ds055990.mlab.com:55990/movie-api', {useNewUrlParser: true});

    mongoose.connection.on('open', () => {
        console.log("MongoDB Connected!");
    });

    mongoose.connection.on('error', (err) => {
        console.log("MongoDB ERR! ",err);
    });

}