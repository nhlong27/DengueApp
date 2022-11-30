import { db_doctor } from '@/dashboard/doctor/App';
export const loadAndFilterFacilities = async (client, filter = null) => {
  let facilities = await client.getAssets();
  facilities = facilities.data;
  let building_arr = facilities.filter((asset) => asset.type === 'BUILDING');
  let room_arr = facilities.filter((asset) => asset.type.includes('ROOM'));
  let bed_arr = facilities.filter((asset) => asset.type.includes('BED'));
  let bedsbed = {}
  let roomsroom = {}
  for (let bed of bed_arr){
    bedsbed[`${bed.name}`] = {...bed}
  }
  db_doctor.bedList = {...bedsbed}
  for (let room of room_arr){
    roomsroom[`${room.name}`] = {...room}
  }
  db_doctor.roomList = {...roomsroom}
  // console.log(building_arr);
  // console.log(room_arr);
  // console.log(bed_arr);
  for (let building of building_arr) {
    db_doctor.facilityList[`${building.name}`] = { ...building, rooms: {} };
    // console.log(db_doctor);

    let rooms = room_arr.filter((room) => room.name.includes(building.name));
    for (let room of rooms) {
      db_doctor.facilityList[`${building.name}`].rooms[`${room.name}`] = {
        ...room,
        beds: {},
      };
      // console.log(db_doctor);

      let beds = bed_arr.filter((bed) => bed.name.includes(room.name));
      for (let bed of beds) {
        db_doctor.facilityList[`${building.name}`].rooms[`${room.name}`].beds[
          `${bed.name}`
        ] = { ...bed };
        // console.log(db_doctor);
      }
    }
  }
  console.log('Getting facilites - db_doctor:');
  console.log(db_doctor);

  // ABOVE IS FASTER WAY OF DOING THINGS
  // let buildings = await client.getAssets({
  //   type: '&type=BUILDING',
  //   textSearch: '',
  //   sortOrder: '',
  //   sortProperty: '',
  // });
  // buildings = buildings.data;
  // db_doctor.facilityList = {};
  // for (let building of buildings) {
  //   db_doctor.facilityList[building.name] = { ...building };
  //   let rooms = await client.getAssets({
  //     type: '&type=ROOM',
  //     textSearch: `&textSearch=${building.name}`,
  //     sortOrder: '',
  //     sortProperty: '',
  //   });
  //   console.log(db_doctor);

  //   rooms = rooms.data;
  //   for (let room of rooms) {
  //     if (db_doctor.facilityList[building.name].rooms) {
  //       db_doctor.facilityList[building.name].rooms[room.name] = { ...room };
  //     } else {
  //       db_doctor.facilityList[building.name].rooms = {};
  //       db_doctor.facilityList[building.name].rooms[room.name] = { ...room };
  //     }
  //     let beds = await client.getAssets({
  //       type: '&type=BED',
  //       textSearch: `&textSearch=${room.name}`,
  //       sortOrder: '',
  //       sortProperty: '',
  //     });
  //     console.log(db_doctor);
  //     console.log(room.name);

  //     beds = beds.data;
  //     for (let bed of beds) {
  //       if (db_doctor.facilityList[building.name].rooms[room.name].beds){
  //         db_doctor.facilityList[building.name].rooms[room.name].beds[bed.name] = { ...bed };
  //       }
  //       else {
  //         db_doctor.facilityList[building.name].rooms[room.name].beds = {};
  //         db_doctor.facilityList[building.name].rooms[room.name].beds[bed.name] = {
  //           ...bed,
  //         };
  //       }
  //       console.log(db_doctor);
  //       console.log(bed.name);
  //     }
  //   }
  // }
};
export const addOrUpdateFacilities = async (client, params) => {
  const facilities = await client.createUpdateAsset(params);
  return facilities;
};
export const deleteFacilities = async (client, assetId) => {
  await client.deleteAsset(assetId);
};

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
