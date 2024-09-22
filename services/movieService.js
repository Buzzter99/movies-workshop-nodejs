const data = require('../data/movies.json');
const movieModel = require('../models/movie');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/movies.json');
function getMovies() {
    return data;
}
function searchMovies(movieTerm) {
    let movies = getMovies();
    if(movieTerm.title) {
        movies = movies.filter((movie) => movie.title.toUpperCase().includes(movieTerm.title.toUpperCase()));
    };
    if(movieTerm.genre) {
        movies = movies.filter((movie) => movie.genre.toUpperCase().includes(movieTerm.genre.toUpperCase()));
    };
    if(movieTerm.year) {
        movies = movies.filter((movie) => movie.year == movieTerm.year);
    };
    return movies.length == 0 ? getMovies() : movies;
}
function getMovieById(id){
    const movie = data.find((movie) => movie.id === id);
    const stars = '&#x2605;';
    if(movie) {
        movie.stars = stars.repeat(Math.ceil(movie.rating));
    }
    return movie; 
}
function generateMovieId() {
    const movies = getMovies();
    return String(Number(movies.length == 0 ? 1 : movies.sort((a,b) => b.id - a.id)[0].id) + 1);
}

function saveMovie(movie) {
    const errors = isMovieValid(movie);
    if(errors.length > 0) {
        throw new Error(JSON.stringify(errors));
    }
    const newMovie = new movieModel(generateMovieId(), movie.title, movie.genre, movie.director, movie.year, movie.imageURL, movie.rating, movie.description);
    saveMovieToDb(newMovie);
}
function saveMovieToDb(movie) {
    data.push(movie);
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFile(filePath, jsonData, (err) => {
        if (err) {
            console.error('Error writing to JSON file', err);
        } else {
            console.log('New movie added and data saved to JSON file');
        }
    });
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
module.exports = {getMovies,searchMovies,getMovieById,generateMovieId,saveMovie}