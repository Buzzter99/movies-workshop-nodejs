const router = require('express').Router();
const {
    getMovies, 
    getMovieById,
    searchMovies,
    saveMovie,
    getMoviesForDetailsPage,
    deleteMovie,
    findByIdAndUpdate,
    getMoviesForHomePage,
    compareOwnershipForMovie
} = require('../services/movieService');
const {privateEndpoint} = require('../middlewares/authenticationMiddleware');
router.get('/',async (req, res) => {
    res.render('home', {movies: await getMoviesForHomePage(res.user?._id)});
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
        const isOwner = compareOwnershipForMovie(res.user?._id, movie);
        res.render('details', {movie, isOwner});
        return;
    }
    res.render('404');
    
});
router.get('/create',privateEndpoint,(req, res) => {
    res.render('create');
});
router.post('/create',privateEndpoint,async (req, res) => {
    try {
        req.body.ownerId = res.user._id;
    await saveMovie(req.body);
    } catch (error) {
        res.status(400).send(error.message);
        return;
    }
    res.redirect('/');
})
router.get('/delete/:id',privateEndpoint, async (req, res) => {
    try {
        await deleteMovie(req.params.id);
    } catch (error) {
        res.status(400).send(error.message);
        return;
    }
    res.redirect('/');
});
router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const movie = await getMovieById(id);
    if(movie) {
        res.render('edit', {movie});
        return;
    }
    res.redirect('404');
})
router.post('/edit/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await findByIdAndUpdate(id, req.body);
    } catch (error) {
        res.status(400).send(error.message);
        return;
    }
    res.redirect('/');
})
module.exports = router