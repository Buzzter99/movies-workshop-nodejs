const router = require('express').Router();
const {getMovies, searchMovies,getMovieById,saveMovie} = require('../services/movieService');
router.get('/', async (req, res) => {
    res.render('home', {movies: await getMovies()});
});
router.get('/about', (req, res) => {
    res.render('about');
});
router.get('/search', async (req, res) => {
    const data = req.query == undefined ? await getMovies() : await searchMovies(req.query);
    res.render('search', {movies: data, query: req.query});
});
router.get('/details/:id', async (req, res) => {
    const movie = await getMovieById(req.params.id);
    if(movie) {
        res.render('details', {movie});
        return;
    }
    res.render('404');
});
router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    try {
    await saveMovie(req.body);
    } catch (error) {
        res.status(400).send(res.json(error.message));
        return;
    }
    res.redirect('/');
})
module.exports = router