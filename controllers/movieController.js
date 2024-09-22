const router = require('express').Router();
const {getMovies, searchMovies,getMovieById,saveMovie} = require('../services/movieService');
router.get('/', (req, res) => {
    res.render('home', {movies: getMovies()});
});
router.get('/about', (req, res) => {
    res.render('about');
});
router.get('/search', (req, res) => {
    const data = req.query == undefined ? getMovies() : searchMovies(req.query);
    res.render('search', {movies: data, query: req.query});
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

router.post('/create', (req, res) => {
    try {
    saveMovie(req.body);
    } catch (error) {
        res.status(400).send(error.message);
        return;
    }
    res.redirect('/');
})
module.exports = router