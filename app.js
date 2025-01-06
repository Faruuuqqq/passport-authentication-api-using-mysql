const express = require('express');
const passport = require('passport');
const session = require('express-session');
const { Strategy } = require('passport-local');
const db = require('./config/db');
const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Configuration
app.use(
  session({
    secret: 'yourSecret',
    resave: false,
    saveUninitialized: false,
  })
);

// Passport Configuration
passport.use(
  new Strategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return done(null, false, { message: 'User not found' });

      const isMatch = await user.validatePassword(password);
      if (!isMatch) return done(null, false, { message: 'Invalid password' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Serialize and Deserialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);

app.post('/auth/login', passport.authenticate('local', {
  successRedirect: '/protected',
  failureRedirect: '/login',
}));

app.get('/protected', (req, res) => {
  if (req.isAuthenticated()) {
    return res.send('Welcome to the protected route!');
  }
  res.redirect('/login');
});

// Start Server
app.listen(5000, () => console.log('Server running on port 5000'));
