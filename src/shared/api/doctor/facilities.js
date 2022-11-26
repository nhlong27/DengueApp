export const loadAndFilterFacilities = async(client, filter) => {
  const assets = await client.getAssets(filter);
  return assets.data;
}
export const addOrUpdateFacilities = async(client, params) =>{
  const asset = await client.createUpdateAsset(params);
  return asset;
}
export const deleteFacilities = async(client, assetId)=>{
  await client.deleteAsset(assetId);
}

// const getAssets = async (client) => {
//   const assets = await client.getAssets();
//   assets.data.forEach((ele) => {
//     let node = document.createElement('div');
//     node.classList.add('text-blue-400')
//     node.setAttribute('id',`${ele.id.id}`)
//     node.innerHTML =`Id: ${ele.id.id} <br/> Name: ${ele.name} <br /> Type: ${ele.type} <br /> Info: ${ele.additionalInfo.note}`;
//     document.getElementById("asset").appendChild(node);
//   })
// }
// const createAsset = async(client, { name, type, label, additionalInfo}) =>{
//   const params = { name: name, type: type, label: label, additionalInfo: additionalInfo}
//   const created = await client.createAsset(params);
//   if (created){
//     let node = document.createElement('div');
//     node.classList.add('text-blue-400')
//     node.setAttribute('id',`${created.id.id}`)
//     node.innerHTML =`Id: ${created.id.id} <br/> Name: ${created.name} <br /> Type: ${created.type} <br /> Info: ${created.additionalInfo.note}`;
//     document.getElementById("asset").appendChild(node);
//   }
//   else return null;
// }

// const updateAsset = async(client, {id:{id, entityType}, type, name, label, additionalInfo}) =>{
//   const params = {id:{id: id, entityType: entityType},name: name, type:type, label:label, additionalInfo: additionalInfo}
//   const updated = await client.createAsset(params);
//   if (updated){
//     document.getElementById(`${updated.id.id}`).innerHTML = `Id: ${updated.id.id} <br/> Name: ${updated.name} <br /> Type: ${updated.type} <br /> Info: ${updated.additionalInfo.note}`;
//   }
//   else return null;
// }

// const deleteAsset = async(client, id) =>{
//   const response = await client.deleteAsset(id);
//   if (response){
//     document.getElementById(`${id}`).remove();
//   }
//   else return null;
// }
// module.exports = {getAssets, createAsset, updateAsset, deleteAsset};