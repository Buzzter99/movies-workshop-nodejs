const router = require('express').Router();
const {createCast, findByIdAndUpdateCast,getAllCastsExcept} = require('../services/castService');
const {getMovieById,findByIdAndUpdateMovie} = require('../services/movieService');
const {privateEndpoint} = require('../middlewares/authenticationMiddleware');
router.get('/cast/create',privateEndpoint, async (req, res) => {
    res.render('cast-create');
});
router.post('/cast/create',privateEndpoint, async (req, res) => {
    try {
        await createCast(req.body);
    } catch (error) {
        res.status(400).send(error.message);
        return;
    }
    res.redirect('/');
});
router.get('/cast/attach/:id',privateEndpoint, async (req, res) => {
    let movie;
    let casts;
    try {
    movie = await getMovieById(req.params.id,'title imageURL');
    casts = await getAllCastsExcept(req.params.id);
    } catch (error) {
        res.render(error.message);
        return;
    }
    if(movie && casts) {
        res.render('cast-attach', {movie, casts});
        return;
    }
    res.render('404');
});
router.post('/cast/attach/:id',privateEndpoint, async (req, res) => {
    try {
        await findByIdAndUpdateCast(req.body.cast, req.params.id);
        await findByIdAndUpdateMovie(req.body.cast, req.params.id,req.body.nameInMovie);
    } catch (error) {
        res.render(error.message);
        return;
    }
    res.redirect('/');
});
module.exports = router;