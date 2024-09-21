const data = require('./data/movies.json');
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
    const movie = data.find((movie) => movie.id == id);
    const stars = '&#x2605;';
    if(movie) {
        movie.stars = stars.repeat(Math.ceil(movie.rating));
    }
    return movie; 
}
class Movie {
    constructor(id, title, genre, director, year, imageURL,rating,description) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.director = director;
        this.year = year;
        this.imageURL = imageURL;
        this.rating = rating;
        this.description = description;
    }
}
module.exports = {getMovies,searchMovies,getMovieById}