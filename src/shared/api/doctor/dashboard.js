import { db_doctor } from '@/dashboard/doctor/App';
export const loadAndFilterPatients = async (client) => {
  let customers = await client.getCustomers({ textSearch: '&textSearch=_ptnt' });
  customers = customers.data;
  for (let customer of customers) {
    let users = await client.getCustomerUsers(customer.id.id);
    db_doctor.patientList[`${customer.title}`] = { ...customer, user: {} };
    for (let user of users) {
      db_doctor.patientList[`${customer.title}`].user = {
        ...user,
        assign: {
          device: { ...user.additionalInfo.device },
          facility: { ...user.additionalInfo.facility },
        },
      };
    }
  }
  console.log('Getting patients - db_doctor:');
  console.log(db_doctor);
};

export const addOrUpdatePatient = async (client, params) => {
  // assetCreationObj.patient {. .. user: { .. assign: { device, asset }] } }
  // Todo: update case
  // if (params.id) {
  //   const customer = await client.createUpdateCustomer(params);
  //   return customer;
  // }
  db_doctor.patientList = {}
  let randomObj = {
    title: params.title + '_ptnt',
    country: params.country,
    city: params.city,
    phone: params.phone,
    address: params.address,
  };
  const customer = await client.createUpdateCustomer(randomObj); //already returns response.data
  db_doctor.patientList[`${customer.title}`] = { ...customer, user: {} };

  const assignedAsset = await client.getAssetById(params.user.assign.facility.id.id);
  const assignedDevice = await client.assignDevice(
    customer.id.id,
    params.user.assign.device.id.id,
  );
  randomObj = {
    customerId: { ...customer.id },
    email: params.user.email,
    firstName: params.user.firstName,
    lastName: params.user.lastName,
    authority: 'CUSTOMER_USER',
    additionalInfo: {
      device: { ...assignedDevice },
      facility: { ...assignedAsset },
    },
  };
  // const assignedAsset = await client.assignAsset(customer.id.id, params.user.assign.facility);
  // await assignDeviceToPatient(client, userParams.customerId.id, deviceId);
  const user = await client.saveUser(randomObj);
  db_doctor.patientList[`${customer.title}`].user = {
    ...user,
    assign: {
      device: { ...user.additionalInfo.device },
      facility: { ...user.additionalInfo.facility },
    },
  };
  // db_doctor.patientList[`${customer.title}`].user.assign = {device: {...assignedDevice}, facility: {...assignedAsset}}
};

export const deletePatient = async (client, customerId) => {
  await client.deleteCustomer(customerId);
};

// export const assignDeviceToPatient = async (client, customerId, deviceId) => {
//   await client.assignDevice(customerId, deviceId);
// };

export const unassignDeviceToPatient = async (client, deviceId) => {
  await client.unassignDevice(deviceId);
};
