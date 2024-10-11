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
      return res.render('login',{errorMsg: error});
    }
    res.cookie('auth', token, {httpOnly: true,maxAge: 2 * 60 * 60 * 1000});
    res.redirect('/');
})
router.get('/users/register', async (req, res) => {
    res.render('register');
});

router.post('/users/register', async (req, res) => {
    try {
        await registerUser(req.body);
    } catch (error) {
        return res.render('register',{errorMsg: error});
    }
    res.redirect('/users/login');
})

router.get('/users/logout', async (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});
module.exports = router