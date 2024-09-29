const router = require('express').Router();
const {getMovies, searchMovies,saveMovie,getMoviesForDetailsPage} = require('../services/movieService');
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
    let movie;
    try {
        movie = await getMoviesForDetailsPage(req.params.id);
    } catch (error) {
        res.render(error.message);
        return;
    }
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
        res.status(400).send(error.message);
        return;
    }
    res.redirect('/');
})
module.exports = router