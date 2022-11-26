export const loadAndFilterNurses = async(client) => {
  const nurseList = [];
  const customers = await client.getCustomers({textSearch: '&textSearch=_nrse'});
  for (const customer of customers.data){
    let nurses = await client.getCustomerUsers(customer.id.id);
    for (const nurse of nurses.data){
      nurseList.push(nurse);
    }
  }
  return nurseList;
}

export const addOrUpdateNurse = async(client, params, assetId=null) =>{
  if (params.id){
    const nurse = await client.saveUser(params);
    return nurse;
  } else{
    const customers = await client.getCustomers({textSearch: '&textSearch=_nrse'});
    if (customers.data[0]){
      params.customerId = {id: customers.data[0].id.id, entityType: 'CUSTOMER'}
      const nurse = await client.saveUser(params)
      return nurse;
    }
    else{
      const customer = await client.createUpdateCustomer({title: 'MedicalStaff_nrse'});
      params.customerId = {id: customer.id.id, entityType: 'CUSTOMER'}
      const nurse = await client.saveUser(params);
      if (assetId){

        await assignAssetToNurse(client, params.customerId.id, assetId);
      }
      return nurse;
    }
  }
}
export const deleteNurse = async(client, customerId) =>{
  await client.deleteCustomer(customerId);
}

export const assignAssetToNurse = async(client, customerId, assetId) => {
  await client.assignAsset(customerId, assetId);
}

export const unassignAssetToNurse = async(client, assetId) => {
  await client.unassignAsset(assetId);
}
