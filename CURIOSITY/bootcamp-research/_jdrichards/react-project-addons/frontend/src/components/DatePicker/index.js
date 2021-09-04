import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DateChooser = () => {
  const [startDate, setStartDate] = useState(new Date());

  let arr = [];
  arr.push(startDate);
  console.log(arr);
  return (
    <>
      <label>
        <i className='fa fa-calendar' aria-hidden='true'></i>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </label>
      <h1>{startDate.toString()}</h1>
    </>
  );
};
export default DateChooser;
