const express = require('express');
const passport = require('../config/passport');
const { register, login, current } = require('../controllers/authController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/current', passport.authenticate('jwt', { session: false }), ensureAuthenticated, current);

module.exports = router;
