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
    const newMovie = await Movie.create(movie);
    await newMovie.save();
}
module.exports = {getMovies,searchMovies,getMovieById,saveMovie}