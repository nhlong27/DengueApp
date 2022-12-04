import React, { useState, useEffect } from 'react';

const now = Date.now();
const mtd = now - 3600000;

const device1 = {
  cmdId: 10,
  entityId: '76c5f2c0-7150-11ed-861d-25ac767dd88b',
  startTs: mtd,
  endTs: now,
};


export const MySocket = ({ client, deviceId }) => {
  const [connected, setConnected] = useState(false);

  const openSocket = async () => {
    let token = await client.connect();

    if (token) {
      setConnected(true);

      client.subscribe(deviceId, async function (response) {
        if (response && response.data) {
          console.log(`${deviceId}`, response.data);
        }
      });
    } else {
      setTimeout(() => openSocket(), 3000);
    }
  };

  useEffect(() => {
    if (!connected) {
      openSocket();
    }
  }, [connected]);

  return <div></div>;
};
