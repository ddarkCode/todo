import React from 'react';
import { Trash } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';

import { formatDate } from '../../utils/utils';
import { removeSchedule } from '../redux/schedule/scheduleReducer';

import '../css/Schedule.css';

const Schedule = ({ createdAt, schedule, _id }) => {
  const dispatch = useDispatch();

  return (
    <div className="schedule">
      <div>
        <time>{formatDate(createdAt)}</time>
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
