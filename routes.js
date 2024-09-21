const router = require('express').Router();
const movieController = require('./controllers/movieController');
router.use(movieController);
router.all('*', (req, res) => {
    res.render('404');
})
module.exports = {router};