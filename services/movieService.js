const Movie = require("../models/Movie");
async function getMovies(...args) {
  return await Movie.find({}, ...args).lean();
}
async function searchMovies(movieTerm) {
  let movies = await getMovies();
  if (movieTerm.title) {
    movies = movies.filter((movie) =>
      movie.title.toUpperCase().includes(movieTerm.title.toUpperCase())
    );
  }
  if (movieTerm.genre) {
    movies = movies.filter((movie) =>
      movie.genre.toUpperCase().includes(movieTerm.genre.toUpperCase())
    );
  }
  if (movieTerm.year) {
    movies = movies.filter((movie) => movie.year == movieTerm.year);
  }
  return movies.length == 0 ? await getMovies() : movies;
}
async function getMovieById(id, ...args) {
  return await Movie.findById(id, ...args).lean();
}
async function getMoviesForDetailsPage(id) {
  const movie = await findAndPopulate(id);
  if (movie) {
    const stars = "&#x2605;";
    movie.stars = stars.repeat(Math.ceil(movie.rating));
  }
  return movie;
}
async function findAndPopulate(id) {
  return await Movie.findById(id).populate("cast.ref").lean();
}
async function saveMovie(movie) {
  const newMovie = await Movie.create(movie);
  await newMovie.save();
}

async function findByIdAndUpdateMovieForCast(castId, movieId, nameInMovie) {
  const movie = await Movie.findById(movieId);
  if (!nameInMovie) {
    throw new Error("Name in movie is required");
  }
  movie.cast.push({ NameInMovie: nameInMovie, ref: castId });
  await movie.save();
}

async function findByIdAndUpdate(id, movie){
    await Movie.findByIdAndUpdate(id,movie);
}
async function deleteMovie(id) {
  await Movie.findByIdAndDelete(id);
}
module.exports = {
  getMovies,
  searchMovies,
  getMovieById,
  saveMovie,
  getMoviesForDetailsPage,
  findByIdAndUpdateMovieForCast,
  findByIdAndUpdate,
  deleteMovie,
};
