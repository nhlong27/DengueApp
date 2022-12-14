const HOST = 'thingsboard.cloud';
// import {HOST, USERNAME, PASSWORD} from '../constants/credentials'
//Requires node.js and mqtt library installed.
var mqtt = require('mqtt');
// import {mqtt} from 'mqtt';

const thingsboardHost = HOST;

// Reads the access token from arguments
// const accessToken = process.argv[2];
const accessToken = 'recoToken';
const minTemperature = 37,
  maxTemperature = 37.5,
  minSpO2 = 95,
  maxSpO2 = 100,
  minHrtPressure = 60,
  maxHrtPressure = 100;

// Initialization of temperature and SpO2 data with random values
var data = {
  temperature: minTemperature + (maxTemperature - minTemperature) * Math.random(),
  SpO2: minSpO2 + (maxSpO2 - minSpO2) * Math.random(),
  HrtPressure: minHrtPressure + (maxHrtPressure - minHrtPressure) * Math.random(),
};

// Initialization of mqtt client using Thingsboard host and device access token
console.log('Connecting to: %s using access token: %s', thingsboardHost, accessToken);
var client = mqtt.connect('mqtt://' + thingsboardHost, { username: accessToken });

// Triggers when client is successfully connected to the Thingsboard server
client.on('connect', function () {
  console.log('Client connected!');
  // Uploads firmware version as device attribute using 'v1/devices/me/attributes' MQTT topic
  client.publish(
    'v1/devices/me/attributes',
    JSON.stringify({ firmware_version: '1.0.1' }),
  );
  // Schedules telemetry data upload once per second
  console.log('Uploading temperature and SpO2 data once per second...');
  setInterval(publishTelemetry, 4000);
});

// Uploads telemetry data using 'v1/devices/me/telemetry' MQTT topic
function publishTelemetry() {
  data.temperature = genNextValue(data.temperature, minTemperature, maxTemperature);
  data.SpO2 = genNextValue(data.SpO2, minSpO2, maxSpO2);
  data.HrtPressure = genNextValue(data.HrtPressure, minHrtPressure, maxHrtPressure);
  client.publish('v1/devices/me/telemetry', JSON.stringify(data));
  console.log(JSON.stringify(data));
}

// Generates new random value that is within 3% range from previous value
function genNextValue(prevValue, min, max) {
  var value = prevValue + (max - min) * (Math.random() - 0.5) * 0.03;
  value = Math.max(min, Math.min(max, value));
  return Math.round(value * 10) / 10;
}

//Catches ctrl+c event
process.on('SIGINT', function () {
  console.log();
  console.log('Disconnecting...');
  client.end();
  console.log('Exited!');
  process.exit(2);
});

//Catches uncaught exceptions
process.on('uncaughtException', function (e) {
  console.log('Uncaught Exception...');
  console.log(e.stack);
  process.exit(99);
});
