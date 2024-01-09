import debug from 'debug';
import CustomError from './CustomError';

const log = debug('index:errorHandler');

export default (err, req, res, next) => {
  const newErr = new CustomError(err.message || err.msg, err.status || 500);
  return res.status(newErr.status || 500).json({ err: newErr });
};
