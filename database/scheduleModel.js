import { Schema, model } from 'mongoose';

const scheduleSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    schedule: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Schedule = model('Schedule', scheduleSchema);

export default Schedule;
