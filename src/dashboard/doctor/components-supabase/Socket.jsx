import React, { useState, useEffect } from 'react';

const now = Date.now();
const mtd = now - 3600000;

const device1 = {
  cmdId: 10,
  entityId: '76c5f2c0-7150-11ed-861d-25ac767dd88b',
  startTs: mtd,
  endTs: now,
};


export const MySocket = ({ client }) => {
  const [connected, setConnected] = useState(false);

  const openSocket = async () => {
    let token = await client.connect();

    if (token) {
      setConnected(true);

      client.subscribe(device1, async function (response) {
        if (response && response.data) {
          console.log('device1', response.data);
        }
      });
    } else {
      setTimeout(() => openSocket(), 5000);
    }
  };

  useEffect(() => {
    if (!connected) {
      openSocket();
    }
  }, [connected]);

  return <div></div>;
};
