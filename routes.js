const router = require('express').Router();
const movieController = require('./controllers/movieController');
const castController = require('./controllers/castController');
const userController = require('./controllers/userController');
router.use(userController);
router.use(castController);
router.use(movieController);
router.all('*', (req, res) => {
    res.render('404');
})
module.exports = {router};