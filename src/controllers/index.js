const express = require('express');

const router = express.Router();

const dashboard = require('./dashboard');

const checkuser = require('./checkUser');
const login = require('./login');
const lendBook = require('./lendBook');
const GSG_Library = require('./GSG_Library');

router.get('/dashboard', dashboard.get );

router.get('/GSG_Library', GSG_Library.get);

router.get('/login', login.get);
router.post('/login', login.post);

router.get('/lendbook', lendBook.get);
router.post('/lendbook', lendBook.post);

router.get('/', (req, res)=>{
});

module.exports = router;
