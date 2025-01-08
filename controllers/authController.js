const User = require ('../models/User');
const passport = require ('passport');

exports.register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      console.log('Request body:', req.body); // Log input dari request
      const userId = await User.create({ name, email, password });
      console.log('User ID created:', userId); // Log hasil dari database
  
      res.status(201).json({ message: 'User registered', userId });
    } catch (err) {
      console.error('Error registering user:', err.message); // Log error lengkap
      res.status(500).json({ error: 'Error registering user' });
    }
  };  

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ error: info.message });
    
        req.login(user, (err) => {
            if (err) return next(err);
            res.json({ message: 'Logged in succesfully', user });
        });
    }) (req, res, next);
};

exports.logout = (req, res) => {
    req.logout((err) => {
      if (err) return res.status(500).json({ error: 'Error logging out' });
      res.json({ message: 'Logged out successfully' });
    });
  };