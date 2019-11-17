const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');

require('dotenv').config()

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

//Initiate our app
const app = express();

//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

if (!isProduction) {
  app.use(errorHandler());
}

const dbUrl = process.env.MONGODB_URL;
// const dbCollection = process.env.DB_COLLECTION || "auth-test";

const accountUrl = process.env.DB_ID + ':' + process.env.INT_PASSWORD

const uri = `mongodb+srv://${accountUrl}@${dbUrl}?retryWrites=true&w=majority`

//sets the required variables from Environment Variables.
mongoose.set('useCreateIndex', true);

//fixes an issue with a depricated default in Mongoose.js
mongoose.connect(uri, { useNewUrlParser: true })
  .then(_ => console.log('Connected Successfully to MongoDB'))
  .catch(err => console.error(err));

//Configure Mongoose
mongoose.set('debug', true);

//Models & routes
require('./models/Users');
require('./config/passport');
app.use(require('./routes'));

//Error handlers & middlewares
if (!isProduction) {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

app.listen(8000, () => console.log('Server running on http://localhost:8000/'));