const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/protected', ensureAuthenticated, (req, res) => {
    res.json({ message: 'You have accessed a protected route'});
});

module.exports = router;