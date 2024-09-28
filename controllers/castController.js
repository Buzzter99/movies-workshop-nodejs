const router = require('express').Router();
const {createCast} = require('../services/castService');
router.get('/cast/create', async (req, res) => {
    res.render('cast-create');
});
router.post('/cast/create', async (req, res) => {
    try {
        await createCast(req.body);
    } catch (error) {
        res.status(400).send(error.message);
        return;
    }
    res.redirect('/');
})
module.exports = router;