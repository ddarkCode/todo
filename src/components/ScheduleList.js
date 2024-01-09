import React from 'react';

import Schedule from './Schedule';

import '../css/ScheduleList.css';

function ScheduleList({ schedules }) {
  return (
    <div className="schedules-list">
      {schedules.map((sch) => {
        return <Schedule key={sch._id} {...sch} />;
      })}
    </div>
  );
}

export default ScheduleList;
