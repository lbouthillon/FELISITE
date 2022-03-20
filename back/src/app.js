const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize');
const bodyParser = require('body-parser');
const cors = require('cors');
const busboy = require('connect-busboy');

const config = require('../config.json');
const {
  user, activity, auth,
} = require('./routers');

const db = require("./models/pool");
const { log } = require('./Logger');

const app = express();

// Session utilisateur
const SeqStore = SequelizeStore(session.Store);
const myStore = new SeqStore({
  db: db.sequelize,
    // The interval at which to cleanup expired sessions in milliseconds
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 24 * 60 * 60 * 1000,
});

app.use(log);

app.use(session({
  store: myStore,
  secret: config.session_secret,
  resave: false,
  saveUninitialized: false,
}));

app.use(cors());
app.use(busboy({
  immediate: true,
  highWaterMark: 2 * 1024 * 1024,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  if ('busboy' in req) {
    req.busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      req.file = {
        fieldname,
        file,
        filename,
        encoding,
        mimetype,
      };
    });
  }
  next();
});

// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
// });

// Routes
app.get('/', (req, res) => res.send('hello'));

app.use('/activity',activity);
app.use('/api/auth',auth);
app.get('/static/:filename', (req, res) => {
  res.sendFile(req.params.filename, { root: './static' });
});



module.exports = app;
