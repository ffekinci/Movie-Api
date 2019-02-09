const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, '{PATH} alanı zorunlu!'],
        minlength: 5

    },
    category: String,
    country: String,
    year: Number,
    imdb_score: Number,
    createdAt: {
        type: Date,
        default: Date.now()
    },

    director_id: mongoose.Schema.Types.ObjectId

});

module.exports = mongoose.model('movie', MovieSchema);
