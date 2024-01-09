import { Router } from 'express';
import passport from 'passport';
import debug from 'debug';

const log = debug('index:authRoutes');

const authRoutes = () => {
  const authRouter = Router();

  authRouter.route('/signup').post((req, res, next) => {
    try {
      passport.authenticate('signup', (err, user, info) => {
        if (err) {
          return next(err);
        }
        req.login(user, (err) => {
          if (err) {
            return next(err);
          }
          const { username, _id, createdAt } = user;
          return res.status(201).json({ username, _id, createdAt });
        });
      })(req, res, next);
    } catch (err) {
      next(err);
    }
  });
  authRouter.route('/login').post((req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
      if (err) {
        return next(err);
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        const { username, _id, createdAt } = user;
        return res.status(200).json({ username, _id, createdAt });
      });
    })(req, res, next);
  });
  authRouter.route('/logout').get((req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json(null);
    });
  });

  authRouter.route('/profile').get((req, res, next) => {
    if (req.isAuthenticated()) {
      const { username, _id, createdAt } = req.user;
      return res.status(200).json({ username, _id, createdAt });
    }
    return res.status(200).json(null);
  });

  return authRouter;
};

export default authRoutes;
