import { db_doctor } from '@/dashboard/doctor/App';

export const loadAndFilterNurses = async (client) => {
  db_doctor.nurseList = {};
  const customers = await client.getCustomers({ textSearch: '&textSearch=_nrse' });
  for (let customer of customers.data) {
    let nurses = await client.getCustomerUsers(customer.id.id);
    for (let nurse of nurses.data) {
      db_doctor.nurseList[`${nurse.email}`] = {
        ...nurse,
        assign: {
          facility: { ...nurse.additionalInfo.facility },
        },
      };
    }
  }
  console.log('Getting nurses - db_doctor:');
  console.log(db_doctor);
};

export const addOrUpdateNurse = async (client, params) => {
  //Update
  // if (params.id){
  //   const nurse = await client.saveUser(params);
  //   return nurse;
  const customers = await client.getCustomers({ textSearch: '&textSearch=_nrse' });
  let randomObj = {
    firstName: params.firstName,
    lastName: params.lastName,
    email: params.email,
    additionalInfo: {
      facility: { ...params.assign.facility },
    },
  };
  if (customers.data[0]) {
    randomObj.customerId = { id: customers.data[0].id.id, entityType: 'CUSTOMER' };
    const nurse = await client.saveUser(randomObj);
    // return nurse;
  } else {
    const customer = await client.createUpdateCustomer({ title: 'MedicalStaff_nrse' });
    randomObj.customerId = { id: customer.id.id, entityType: 'CUSTOMER' };
    const nurse = await client.saveUser(randomObj);
    if (params.assign.facility) {
      await assignAssetToNurse(
        client,
        randomObj.customerId.id,
        params.assign.facility.id.id,
      );
    }
    // return nurse;
  }
};
export const deleteNurse = async (client, customerId) => {
  await client.deleteCustomer(customerId);
};

export const assignAssetToNurse = async (client, customerId, assetId) => {
  await client.assignAsset(customerId, assetId);
};

export const unassignAssetToNurse = async (client, assetId) => {
  await client.unassignAsset(assetId);
};
