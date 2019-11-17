const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('User');

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new Users(user);
  finalUser.setPassword(user.password);

  Users.init().then(() => {
    finalUser.save((err, data) => {
      if (err) {
        return res.status(400).json(err)
      }
      return res.json({ user: finalUser.toAuthJSON() })
    })
  })
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  console.log("USER: ", user)

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {

    if (err) {
      return next(err);
    }

    if (passportUser) {
      const user = passportUser;

      return res.json({ user: user.toAuthJSON() });
    } else {
      return res.status(400).json({ errors: { message: info.message } })
    }

  })(req, res, next);
});

router.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/')
})

router.post('/checkemailexist', (req, res) => {
  const { body: { email } } = req;

  Users.findOne({ email }, function (err, foundUser) {
    console.log(foundUser);
    if (foundUser) {
      return res.json({ email: foundUser.email })
    } else {
      return res.json({ email: null })
    }

  })
})

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return Users.findById(id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;