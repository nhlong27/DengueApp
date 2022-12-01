import React, { useState, useEffect } from 'react';

const now = 1669888094859;

//device
const device = {
  keys: ['temperature', 'SpO2', 'HrtPressure'],
  limit: 20,
  agg: 'AVG',
  interval: 1000,
  startTs: now - 100000,
  endTs: now,
  entityId: '76c5f2c0-7150-11ed-861d-25ac767dd88b',
};

//component
const TimeSeries = ({ client }) => {
  const [timeseries, setTimeseries] = useState(null); //device timeseries
  const [connected, setConnected] = useState(null); //client is connected

  const connect = async () => {
    const token = await client.connect(); // connect() returns token or null

    if (token) {
      console.log('connected')
      setConnected(true);
      client.getTimeseries(device, setTimeseries);
    } else {
      alert('Login failed !!!');
      setConnected(false);
    }
  };

  useEffect(() => {
    connect();
  }, []);

  if (connected && timeseries) {
    return (
      <div>
        Here's the results:
        {console.log(timeseries)}
        {/* <ul>
          {timeseries.temperature
            // timeseries.temperature.map((item, index) => (
            //   <li key={index}>
            //     {item.ts}: {item.value}
            //   </li>
            // ))}
        </ul> */}
      </div>
    );
  } else {
    return 'Connecting...';
  }
};

export default TimeSeries;
