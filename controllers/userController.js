const router = require('express').Router();
const {registerUser} = require('../services/usersService');
router.get('/users/login', async (req, res) => {
    res.render('login');
});

router.get('/users/register', async (req, res) => {
    res.render('register');
});

router.post('/users/register', async (req, res) => {
    console.log(req.body);
    try {
        await registerUser(req.body);
    } catch (error) {
        res.status(400).send(error.message);
        return;
    }
    res.redirect('/');
})
module.exports = router