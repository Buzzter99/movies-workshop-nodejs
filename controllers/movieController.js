const router = require('express').Router();
const {getMovies, searchMovies,getMovieById} = require('../services/movieService');
router.get('/', (req, res) => {
    res.render('home', {movies: getMovies()});
});
router.get('/about', (req, res) => {
    res.render('about');
});
router.get('/search', (req, res) => {
    res.render('search', {movies: getMovies()});
});

router.post('/search', (req, res) => {
    res.render('search', {movies: searchMovies(req.body)});
});
router.get('/details/:id', (req, res) => {
    const movie = getMovieById(req.params.id);
    if(movie) {
        res.render('details', {movie});
        return;
    }
    res.render('404');
});
router.get('/create', (req, res) => {
    res.render('create');
});
module.exports = router