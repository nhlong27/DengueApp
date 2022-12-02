import {client} = from '../../shared/api/initClient_tenant';
// require('dotenv').config()
import {USERNAME, HOST, PASSWORD} = from '../../shared/constants/credentials.js';
import * as dashboardAPI from '../api/doctor/dashboard';
import * as nurseAPI from '../api/doctor/nurses';
import * as facilityAPI from '../api/doctor/facilities';
import * as deviceAPI from '../api/doctor/devices';
import {addPatient, addNurse, addDevice, addFacility} from './addEntity';
import {updatePatient, updateDevice, updateNurse, updateFacility } from './updateEntity';

// const now = Date.now();
// const mtd = now-3600000;



const connect = async () => {
  console.log('connecting to server')
  let token = await client.connect();
  if (token){
    const patientList = await dashboardAPI.loadAndFilterPatients(client);
    console.log(patientList)
    let html = '';
    patientList.forEach(patient=>{
      html += `<div id=${patient.id.id}>Title:${patient.title} <br/>Phone:${patient.phone} <br/> Email:${patient.email} <button class="update-patient" value=${JSON.stringify(patient)}>Update</button></div>`;  
    }) 
    document.getElementById('dashboard').insertAdjacentHTML('beforeend', html);
  
    const dashboardContainer = document.getElementById('dashboard-container');
    dashboardContainer.addEventListener('click', (event) => {
      const isAddPatientButton = event.target.id === 'add-patient';
      const isUpdatePatientButton = event.target.className === 'update-patient'
      if (isAddPatientButton) {
        addPatient(client)
      }
      else if (isUpdatePatientButton){
        updatePatient(client, event.target)
      }
    })

    const nurseList = await nurseAPI.loadAndFilterNurses(client);
    console.log(nurseList)
    let html_nurse = '';
    nurseList.forEach(nurse=>{
      html_nurse += `<div id=${nurse.id.id}>${nurse.email} <button class="update-nurse" value=${JSON.stringify(nurse)}>Update</button></div>`;  
    }) 
    document.getElementById('nurses').insertAdjacentHTML('beforeend', html_nurse);

    const nurseContainer = document.getElementById('nurse-container');
    nurseContainer.addEventListener('click', (event) => {
      const isAddNurseButton = event.target.id === 'add-nurse';
      const isUpdateNurseButton = event.target.className === 'update-nurse'
      if (isAddNurseButton) {
        addNurse(client)
      }
      else if (isUpdateNurseButton){
        updateNurse(client, event.target)
      }
    })

    const deviceList = await deviceAPI.loadAndFilterDevices(client);
    console.log(deviceList)
    let html_device = '';
    deviceList.forEach(device=>{
      html_device += `<div id=${device.id.id}>${device.name} <button class="update-device" value=${JSON.stringify(device)}>Update</button></div>`;  
    }) 
    document.getElementById('devices').insertAdjacentHTML('beforeend', html_device);

    const deviceContainer = document.getElementById('device-container');
    deviceContainer.addEventListener('click', (event) => {
      const isAddDeviceButton = event.target.id === 'add-device';
      const isUpdateDeviceButton = event.target.className === 'update-device'
      if (isAddDeviceButton) {
        addDevice(client)
      }
      else if (isUpdateDeviceButton){
        updateDevice(client, event.target)
      }
    })

    const facilityList = await facilityAPI.loadAndFilterFacilities(client);
    console.log(facilityList)
    let html_facility = '';
    facilityList.forEach(facility=>{
      html_facility += `<div id=${facility.id.id}>${facility.name} <button class="update-facility" value=${JSON.stringify(facility)}>Update</button></div>`;  
    }) 
    document.getElementById('facilities').insertAdjacentHTML('beforeend', html_facility);

    const facilityContainer = document.getElementById('facility-container');
    facilityContainer.addEventListener('click', (event) => {
      const isAddFacilityButton = event.target.id === 'add-facility';
      const isUpdateFacilityButton = event.target.className === 'update-facility'
      if (isAddFacilityButton) {
        addFacility(client)
      }
      else if (isUpdateFacilityButton){
        updateFacility(client, event.target)
      }
    })








    // await addOrUpdateCustomerUser(client, params2);
    // await assetApi.getAssets(client);
    // const func = async() =>{
    //   await assetApi.createAsset(client, {name: 'Room 102', type:'Room', label:'BMH Room', additionalInfo:{note:'only assigned to building assset'}});
    // }
    // document.getElementById('create-asset-button').addEventListener('click', func);

    // const result = await client.findRelatedDevices(params);

        // await assetApi.updateAsset(client, {id:{id: '1cc51b60-6bac-11ed-b78f-b9a3f0002242', entityType:'ASSET'}, name:'Room102', type:'Room', label:'BMH Room', additionalInfo:{note:'final change'}})
    // await assetApi.deleteAsset(client, '1cc51b60-6bac-11ed-b78f-b9a3f0002242' )
    // let devices = await client.getDevices();
    // devices.data.forEach((ele) => {
    //   let node = document.createElement('div');
    //   node.classList.add('text-yellow-600')
    //   node.innerHTML =`Name: ${ele.name} <br /> Label: ${ele.label}`;
    //   document.getElementById("device").appendChild(node);
    // })

    // let customers = await client.getCustomers();
    // customers.data.forEach((ele) => {
    //   let node = document.createElement('div');
    //   node.classList.add('text-green-600')
    //   node.innerHTML =`Name: ${ele.name} <br /> Title: ${ele.title}`;
    //   document.getElementById("customer").appendChild(node);
    // })
    // let customerUsers = await client.getCustomerUsers('6d13fde0-6a2e-11ed-b78f-b9a3f0002242');
    // customerUsers.data.forEach((ele) => {
    //   let node = document.createElement('div');
    //   node.classList.add('text-gray-600')
    //   node.innerHTML =`First name: ${ele.firstName} <br /> Last name: ${ele.lastName} <br />  Email: ${ele.email}`;
    //   document.getElementById("patient").appendChild(node);
    // })
    

    

  };
}
connect();


// Websocket subscription (one device - device A)
// const deviceA_websocket = {
//   cmdId: 10,
//   entityId: DEVICE_ID_A,
//   startTs: mtd,
//   endTs: now
// };

// const callbackA_websocket = async(response) =>{
//   if(response && response.data){
//     console.log('deviceA, returned message:', response.data);
//     const data = response.data;
//     Object.entries(data).map((pair, index) => {
//       document.getElementById("websocket-subscription-one").children[index].innerHTML = `${pair[0]} <br /> Ts: ${pair[1][0][0]} Value: ${pair[1][0][1]}`;
//     })
//  }
// }
// // openSocket({ client:client, callback: callbackA_websocket, device: deviceA_websocket});

// // Get existing timeseries (one device - device A)

// const deviceA_timeseries ={
//   entityId: DEVICE_ID_A,
//   keys: ['temperature', 'SpO2', 'HrtPressure'],
//   limit: 500,
//   agg: 'AVG',
//   interval: 60000,
//   startTs: now-3600000,
//   endTs: now,
//   useStrictDataTypes: true
// }
// const callbackA_timeseries = async(response) =>{
//   if(response && response.data){
//     console.log('timeseries - deviceA, returned data:', response.data);
//     // const data = response.data;
//     // Object.entries(data).map((pair, index) => {
//     //   document.getElementById("websocket-subscription-one").children[index].innerHTML = `${pair[0]} <br /> Ts: ${pair[1][0][0]} Value: ${pair[1][0][1]}`;
//     // })
//  }
//  else console.log('no data')
// }
// const getTelemetry = async ({client, device, callback}) =>{
//   console.log('connecting to thingsboard server..');
//   let token = await client.connect();
//   if (token){
//     console.log('get timeseries data')
//     client.getTimeseries(device, callback);
//   }
//   else {
//     console.error('Timeseries Query Not working');
//   }
// }

// // getTelemetry({client:client, device: deviceA_timeseries, callback: callbackA_timeseries});

// // Get user
// const assetInfo ={
//   name: 'Building B',
//   type: 'Building',
//   label: `Bach Mai Hospital's building`,
//   additionalInfo:{
//     relation: 'This asset should be assigned to customer B'
//   }
// }

// // createAsset({client:client, params: assetInfo});

// // console.log('random func..')
// // const randomFunc = async() =>{
// //   let token = await client.connect();
// //   if (token){
// //     client.createAsset(assetInfo);
// //   }
// // }
// // randomFunc();


// console.log('finished')