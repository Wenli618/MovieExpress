const mongoose = require('mongoose');
const Joi = require('joi');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255,
    },
    overview: String,
    poster: String,
    category: [String],
    releaseDate: String,
    director: String
}, {timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);

// validate movie input using Joi
function validateMovieInput(movie) {
    const Schema = Joi.object({
        title: Joi.string().min(1).max(255).required(),
        overview: Joi.string().required(),
        poster: Joi.string().required(),
        releaseDate: Joi.string().required(),
        director: Joi.string().required()
    });
    return Schema.validate(movie);
}

module.exports.Movie = Movie;
module.exports.validateMovieInput = validateMovieInput;