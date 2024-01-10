import React from 'react';
import { Trash } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';

import { formatDate } from '../../utils/utils';
import { removeSchedule } from '../redux/schedule/scheduleReducer';

import '../css/Schedule.css';

const Schedule = ({ createdAt, schedule, _id }) => {
  const dispatch = useDispatch();
  const { date, time } = formatDate(createdAt);

  return (
    <div className="schedule">
      <div>
        <aside>
          <span>{date}</span>
          <time>{time}</time>
        </aside>
        <Trash
          className="trash"
          onClick={() => dispatch(removeSchedule(_id))}
        />
      </div>
      <p>{schedule}</p>
    </div>
  );
};

export default Schedule;
