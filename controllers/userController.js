const router = require('express').Router();
const {registerUser,loginUser} = require('../services/usersService');
router.get('/users/login', async (req, res) => {
    res.render('login');
});

router.post('/users/login', async (req, res) => {
    let token;
    try {
      token = await loginUser(req.body);
    } catch (error) {
        res.status(400).send(error.message);
        return;
    }
    res.cookie('auth', token, {httpOnly: true});
    res.redirect('/');
})

router.get('/users/register', async (req, res) => {
    res.render('register');
});

router.post('/users/register', async (req, res) => {
    try {
        await registerUser(req.body);
    } catch (error) {
        res.status(400).send(error.message);
        return;
    }
    res.redirect('/');
})

router.get('/users/logout', async (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});
module.exports = router