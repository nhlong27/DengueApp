export const loadAndFilterDevices = async(client, filter) => {
  const devices = await client.getDevices(filter);
  return devices.data;
}
export const addOrUpdateDevice = async(client, params) =>{
  const device = await client.createUpdateDevice(params);
  return device;
}
export const deleteDevice = async(client, deviceId)=>{
  await client.deleteDevice(deviceId);
}
