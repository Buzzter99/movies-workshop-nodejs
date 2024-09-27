const Movie = require('../models/Movie');
async function getMovies() {
    return await Movie.find().lean();
}
async function searchMovies(movieTerm) {
    let movies = await getMovies();
    if(movieTerm.title) {
        movies = movies.filter((movie) => movie.title.toUpperCase().includes(movieTerm.title.toUpperCase()));
    };
    if(movieTerm.genre) {
        movies = movies.filter((movie) => movie.genre.toUpperCase().includes(movieTerm.genre.toUpperCase()));
    };
    if(movieTerm.year) {
        movies = movies.filter((movie) => movie.year == movieTerm.year);
    };
    return movies.length == 0 ? await getMovies() : movies;
}
async function getMovieById(id){
    const movie = await Movie.findById(id).lean();
    const stars = '&#x2605;';
    if(movie) {
        movie.stars = stars.repeat(Math.ceil(movie.rating));
    }
    return movie; 
}

async function saveMovie(movie) {
    const errors = isMovieValid(movie);
    if(errors.length > 0) {
        throw new Error(JSON.stringify(errors));
    }
    const newMovie = new Movie({
        title: movie.title,
        genre: movie.genre,
        director: movie.director,
        year: movie.year,
        imageURL: movie.imageURL,
        rating: movie.rating,
        description: movie.description
    });
    await newMovie.save();
}
function isMovieValid(movie) {
    const errors = [];
    if(!movie.title) {
        errors.push({"errorMessage":'Title is required'});
    };
    if(!movie.genre) {
        errors.push({"errorMessage":'Genre is required'});
    };
    if(!movie.director) {
        errors.push({"errorMessage":'Director is required'});
    };
    if(!movie.year || Number.isInteger(Number(movie.year)) === false) {
        errors.push({"errorMessage":'Year is required or it should be whole number'});
    };
    if(!movie.imageURL || movie.imageURL.match(/\.(jpeg|jpg)$/) == null) {
        errors.push({"errorMessage":'Image URL is required or support format is not supported'});
    };
    if(!movie.rating) {
        errors.push({"errorMessage":'Rating is required'});
    };
    if(movie.rating < 1 || movie.rating > 5) {
        errors.push({"errorMessage":'Rating should be between 1 and 5 including'});
    };
    if(typeof movie.rating === 'number' && !isNaN(num) == false){
        errors.push({"errorMessage":'Rating should be number'});
    }
    if(!movie.description) {
        errors.push({"errorMessage":'Description is required'});
    };
    return errors;
}
module.exports = {getMovies,searchMovies,getMovieById,saveMovie}