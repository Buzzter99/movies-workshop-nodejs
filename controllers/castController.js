const router = require('express').Router();
const {createCast, findByIdAndUpdateCast,getAllCastsExcept} = require('../services/castService');
const {compareOwnershipForMovie} = require('../services/movieService');
const {getMovieById,findByIdAndUpdateMovieForCast} = require('../services/movieService');
const {privateEndpoint} = require('../middlewares/authenticationMiddleware');
router.get('/cast/create',privateEndpoint, async (req, res) => {
    res.render('cast-create');
});
router.post('/cast/create',privateEndpoint, async (req, res) => {
    const data = req.body;
    try {
        await createCast(req.body);
    } catch (error) {
        return res.render('cast-create',{cast: data,errorMsg: error});
    }
    res.redirect('/');
});
router.get('/cast/attach/:id',privateEndpoint, async (req, res) => {
    let movie;
    let casts;
    try {
    movie = await getMovieById(req.params.id,'title imageURL ownerId');
    casts = await getAllCastsExcept(req.params.id);
    } catch (error) {
        res.render(error.message);
        return;
    }
    if(!compareOwnershipForMovie(res.user?._id, movie)) {
        res.render('404');
        return;
    }
    if(movie && casts) {
        res.render('cast-attach', {movie, casts});
        return;
    }
    res.render('404');
});
router.post('/cast/attach/:id',privateEndpoint, async (req, res) => {
    const movie = await getMovieById(req.params.id);
    if(!compareOwnershipForMovie(res.user?._id, movie)) {
        res.render('404');
        return;
    }
    try {
        await findByIdAndUpdateCast(req.body.cast, req.params.id);
        await findByIdAndUpdateMovieForCast(req.body.cast, req.params.id,req.body.nameInMovie);
    } catch (error) {
       return res.render(`404`);
    }
    res.redirect('/');
});
module.exports = router;