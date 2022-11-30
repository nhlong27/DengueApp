import { db_doctor } from '@/dashboard/doctor/App';

export const loadAndFilterDevices = async (client, filter) => {
  let devices = await client.getDevices(filter);
  devices = devices.data;
  for (let device of devices) {
    console.log(device);
    console.log(db_doctor);
    db_doctor.deviceList[`${device.name}`] = { ...device };
  }
  console.log('Getting devices - db_doctor:');
  console.log(db_doctor);
};
export const addOrUpdateDevice = async (client, params) => {
  const device = await client.createUpdateDevice(params);
  return device;
};
export const deleteDevice = async (client, deviceId) => {
  await client.deleteDevice(deviceId);
};
