export const loadAndFilterPatients = async(client) => {
  const patientList = [];
  const customerList = [];
  const customers = await client.getCustomers({textSearch: '&textSearch=_ptnt'});
  for (const customer of customers.data){
    // let patient = await client.getCustomerUsers(customer.id.id);
    // patientList.push(patient.data[0]);
    customerList.push(customer)
  }
  // return patientList;
  return customerList;
}

export const addOrUpdatePatient = async(client, params, deviceId=null) =>{
  params.title += '_ptnt'; 
  if (params.id){
    const customer = await client.createUpdateCustomer(params);
    return customer;
  } else{
    const customer = await client.createUpdateCustomer(params);
    const userParams = {
      "email": params.email,
      "authority": "CUSTOMER_USER",
      "firstName": params.title,
      "name": params.title
    }
    userParams.customerId = {id: customer.id.id, entityType: 'CUSTOMER'}
    const patient = await client.saveUser(userParams);
    if (deviceId){
      await assignDeviceToPatient(client, userParams.customerId.id, deviceId);
    }
    return customer;
  }
}

export const deletePatient = async(client, customerId) =>{
  await client.deleteCustomer(customerId);
}

export const assignDeviceToPatient = async(client, customerId, deviceId) => {
  await client.assignDevice(customerId, deviceId);
}

export const unassignDeviceToPatient = async(client, deviceId) => {
  await client.unassignDevice(deviceId);
}

