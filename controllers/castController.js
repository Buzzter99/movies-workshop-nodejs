const router = require('express').Router();
router.get('/cast/create', async (req, res) => {
    res.render('cast-create');
});

router.post('/cast/create', async (req, res) => {
    console.log(req.body);
    res.end();
})
module.exports = router;