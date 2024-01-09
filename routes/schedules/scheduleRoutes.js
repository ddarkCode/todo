import { Router } from 'express';

import scheduleControllers from '../../controllers/scheduleControllers';

export default function scheduleRoutes() {
  const scheduleRouter = Router();
  const {
    getASchedule,
    getAScheduleMiddleware,
    verifyLoginStatusMiddleware,
    addSchedule,
    deleteAllSchedule,
    getAllSchedules,
    updateSchedule,
    deleteSchedule,
  } = scheduleControllers;
  scheduleRouter.use(verifyLoginStatusMiddleware);
  scheduleRouter
    .route('/')
    .get(getAllSchedules)
    .post(addSchedule)
    .delete(deleteAllSchedule);
  scheduleRouter
    .route('/:scheduleId')
    .all(getAScheduleMiddleware)
    .get(getASchedule)
    .patch(updateSchedule)
    .delete(deleteSchedule);

  return scheduleRouter;
}
