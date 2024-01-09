import { config } from 'dotenv';
config();

import express from 'express';
import React from 'react';
import morgan from 'morgan';
import { connect } from 'mongoose';
import debug from 'debug';
import cors from 'cors';
import session from 'express-session';
import { matchRoutes } from 'react-router-config';
import connectMongodbSession from 'connect-mongodb-session';

import Routes from './src/Routes';
import configureStore from './helpers/configureStore';
import renderer from './helpers/renderer';
import passportConfig from './passport';
import authRoutes from './routes/auth/authRoutes';
import scheduleRoutes from './routes/schedules/scheduleRoutes';
import errorHandler from './middlewares/errorHandler';

const { PORT, MONGO_LOCAL, SESSION_SECRET } = process.env;
const app = express();
const log = debug('index');

const MongoStoreSession = connectMongodbSession(session);
const store = new MongoStoreSession({
  uri: MONGO_LOCAL,
  collection: 'scheduleSessions',
});

app.use(cors());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      maxAge: 3600000 * 24 * 7 * 4 * 12,
    },
  })
);
passportConfig(app);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', authRoutes());
app.use('/api/schedules', scheduleRoutes());

app.use(errorHandler);

app.get('*', (req, res, next) => {
  const store = configureStore();
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : Promise.resolve(null);
  });

  Promise.all(promises)
    .then((val) => {
      const context = {};
      const html = renderer(store, context, req);
      return res.status(200).send(html);
    })
    .catch((err) => {
      return next(err);
    });
});

app.listen(PORT, () => {
  log(`Server Is Running On Port: ${PORT}`);

  (async function connectToEDB() {
    await connect(MONGO_LOCAL);
    log('Connection To Database Successful.');
  })();
});
