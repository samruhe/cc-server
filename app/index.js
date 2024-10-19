require('dotenv').config();

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;

require('../db').connectDb();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,PUT,POST,DELETE',
  credentials: true,
}));

require('../middleware/passport');

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '5mb' }));

app.use(session({
  name: 'ccscheduler.sid',
  secret: process.env.TOKEN_KEY,
  httpOnly: true,
  secure: true,
  maxAge: 1000 * 60 * 60 * 7,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.dyijv.mongodb.net/?retryWrites=true&w=majority`
  }),
}));

app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    // console.log(`PARAMS: ${req.params}`);
    console.log(`QUERY: ${JSON.stringify(req.query, null, 2)}`);
    console.log(`BODY: ${JSON.stringify(req.body, null, 2)}`);
    console.log();
    next();
  });
}

app.use('/api', require('./routes'));
// app.use('/verifyEmail', require('./helpers/verifyEmail'));

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).send('error');
});

app.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});
