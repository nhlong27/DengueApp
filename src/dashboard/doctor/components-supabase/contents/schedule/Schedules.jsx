import React, { useState } from 'react';
import { DatePicker, DateRangePicker } from '@mantine/dates';

const Schedules = () => {
  const [value, onChange] = useState(new Date());
  console.log('datepicker value');
  console.log(value);
  return <DatePicker value={value} onChange={onChange} />;
};

export default Schedules;
