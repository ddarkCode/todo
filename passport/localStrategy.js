import passport from 'passport';
import { Strategy } from 'passport-local';
import debug from 'debug';

import User from '../database/authModel';

const log = debug('index:localStrategy');

export default () => {
  passport.use(
    'signup',
    new Strategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const foundUser = await User.findOne({ username });
          if (foundUser) {
            return done(
              { message: 'Username Already Exist', status: 403 },
              false
            );
          }
          const user = await User.create({
            username,
            password,
          });
          return done(null, user, {
            message: 'Successfully Registered A New Account.',
          });
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );
  passport.use(
    'login',
    new Strategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const foundUser = await User.findOne({ username });
          if (!foundUser) {
            return done({ message: 'Wrong Username Provided.' }, false);
          }
          const isCorrectPassword = await foundUser.verifyPassword(
            password,
            foundUser.password
          );

          if (isCorrectPassword) {
            return done(null, foundUser, { message: 'Login Successful' });
          }

          return done({ message: 'Wrong Password Provided.' }, false);
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );
};
