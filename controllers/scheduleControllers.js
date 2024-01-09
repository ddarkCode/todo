import debug from 'debug';

import Schedule from '../database/scheduleModel';
import CustomError from '../middlewares/CustomError';

const log = debug('index:scheduleController');

export default (function scheduleController() {
  const verifyLoginStatusMiddleware = (req, res, next) => {
    try {
      if (req.isAuthenticated()) {
        return next();
      } else {
        throw new CustomError('Please Login To Continue.', 403);
      }
    } catch (err) {
      return next(err);
    }
  };
  const getAllSchedules = async (req, res, next) => {
    const { username } = req.user;
    try {
      const foundSchedules = await Schedule.find({ username });
      return res.status(200).json(foundSchedules);
    } catch (err) {
      return next(err);
    }
  };
  const addSchedule = async (req, res, next) => {
    try {
      const { username } = req.user;
      const { schedule } = req.body;
      const newSchedule = await Schedule.create({
        username,
        schedule,
      });

      return res.status(201).json(newSchedule);
    } catch (err) {
      return next(err);
    }
  };
  const deleteAllSchedule = async (req, res, next) => {
    try {
      const { username } = req.user;
      const deletedSchedules = await Schedule.deleteMany({ username });
      log(deletedSchedules);
      return res.status(200).json(deletedSchedules);
    } catch (err) {
      return next(err);
    }
  };
  const getAScheduleMiddleware = async (req, res, next) => {
    try {
      const { username } = req.user;
      const { scheduleId } = req.params;
      const foundSchedule = await Schedule.findOne({
        username,
        _id: scheduleId,
      });
      if (!foundSchedule) {
        throw new CustomError('Schedule Not found.', 404);
      }
      req.foundSchedule = foundSchedule;
      return next();
    } catch (err) {
      return next(err);
    }
  };
  const getASchedule = async (req, res, next) => {
    const { foundSchedule } = req;
    return res.status(200).json(foundSchedule);
  };
  const updateSchedule = async (req, res, next) => {
    try {
      const { foundSchedule } = req;
      Object.entries(req.body).forEach((entry) => {
        const [key, value] = entry;
        foundSchedule[key] = value;
      });
      await foundSchedule.save();
      return res.status(200).json(foundSchedule);
    } catch (err) {
      return next(err);
    }
  };
  const deleteSchedule = async (req, res, next) => {
    const { foundSchedule } = req;
    try {
      await foundSchedule.deleteOne();
      return res.status(200).json({ scheduleId: foundSchedule._id });
    } catch (err) {
      return next(err);
    }
  };
  return {
    verifyLoginStatusMiddleware,
    getAllSchedules,
    addSchedule,
    deleteAllSchedule,
    getASchedule,
    getAScheduleMiddleware,
    updateSchedule,
    deleteSchedule,
  };
})();
