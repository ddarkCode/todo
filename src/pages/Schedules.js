import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ScheduleList from '../components/ScheduleList';
import { getSchedules, addSchedule } from '../redux/schedule/scheduleReducer';
import { logout } from '../redux/auth/authReducer';
import authenticate from '../hoc/authenticate';

import '../css/Schedules.css';

function Schedules() {
  const [task, setTask] = useState({
    schedule: '',
  });

  useEffect(() => {
    dispatch(getSchedules());
  }, []);

  const dispatch = useDispatch();
  const schedules = useSelector((state) => state.schedules.schedules);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ schedule: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.schedule !== '') {
      dispatch(addSchedule(task));
      setTask({ schedule: '' });
    }
  };

  return (
    <div className="schedules-page">
      <button onClick={() => dispatch(logout())}>Logout</button>
      <div className="form-container">
        <form>
          <input
            name="task"
            value={task.schedule}
            placeholder="Add Note"
            onChange={handleChange}
            required
            className="task-input"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="2em"
            height="2em"
            fill="#fac937"
            className="add-task"
            onClick={handleSubmit}
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
          </svg>
        </form>
      </div>

      <ScheduleList schedules={schedules} />
    </div>
  );
}

export default {
  component: authenticate(Schedules),
  loadData: (store) => store.dispatch(getSchedules()),
};
