import { addOrUpdateNurse } from '../api/doctor/nurses';
import { addOrUpdatePatient } from '../api/doctor/dashboard';
import {createForm} from './createForm';
import * as schema from '../constants/requestSchema';
import { addOrUpdateFacilities } from '../api/doctor/facilities';
import { addOrUpdateDevice } from '../api/doctor/devices';

export const addPatient = (client) =>{
  const form = document.getElementById('add-patient-form');
  if (form){
    form.remove();
  }else{
    const form = createForm('add-patient-form','add-patient-container',schema.customer);

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", 'device');
    input.setAttribute("placeholder", 'Enter your device_id');
    
    const btn = document.querySelector('#add-patient-form button');
    form.insertBefore(input, btn);
    
    btn.addEventListener("click", async function(e) {
      form.style.display = "none";
      let params = {}
      let deviceID = '';
      const inputs = document.querySelectorAll('#add-patient-form input');
      for (let input of inputs){
        if (input.id === 'device'){
          deviceID = input.value;
        }else{
          params[`${input.name}`] = input.value; 
        }
      }
      console.log(params)
      console.log(deviceID)
      const customer = await addOrUpdatePatient(client, params, deviceID);
      const html = `<div id=${customer.id.id}>Title:${customer.title} <br/>Phone:${customer.phone} <br/> Email:${customer.email} <button class="update-patient" value=${JSON.stringify(customer)}>Update</button></div>`;  
      document.getElementById('dashboard').insertAdjacentHTML('beforeend',html);
    })
  }
}

export const addNurse = (client) =>{
  const form = document.getElementById('add-nurse-form');
  if (form){
    form.remove();
  }else{
    const form = createForm('add-nurse-form','nurses',schema.user);

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", 'asset');
    input.setAttribute("placeholder", 'Enter your asset_id');
    
    const btn = document.querySelector('#add-nurse-form button');
    form.insertBefore(input, btn);
    
    btn.addEventListener("click", async function(e) {
      form.style.display = "none";
      let params = {}
      let assetID = '';
      const inputs = document.querySelectorAll('#add-nurse-form input');
      for (let input of inputs){
        if (input.id === 'asset'){
          assetID = input.value;
        }else{
          params[`${input.name}`] = input.value; 
        }
      }
      console.log(params)
      console.log(assetID)
      const user = await addOrUpdateNurse(client, params, assetID);
      const html = `<div id=${user.id.id}>${user.email}<button class="update-nurse" value=${JSON.stringify(user)}>Update</button></div>`;
      document.getElementById('nurses').insertAdjacentHTML('beforeend',html);
    })
  }
}

export const addFacility = (client) =>{
  const form = document.getElementById('add-facility-form');
  if (form){
    form.remove();
  }else{
    const form = createForm('add-facility-form','facilities',schema.asset);
    const btn = document.querySelector('#add-facility-form button');
    
    btn.addEventListener("click", async function(e) {
      form.style.display = "none";
      let params = {}
      const inputs = document.querySelectorAll('#add-facility-form input');
      for (let input of inputs){
          params[`${input.name}`] = input.value; 
        }
      console.log(params)
      const asset = await addOrUpdateFacilities(client, params);
      const html = `<div id=${facility.id.id}>${facility.name} <button class="update-facility" value=${JSON.stringify(facility)}>Update</button></div>`;  
      document.getElementById('facilities').insertAdjacentHTML('beforeend',html);
      })
  }
}
export const addDevice = (client) =>{
  const form = document.getElementById('add-device-form');
  if (form){
    form.remove();
  }else{
    const form = createForm('add-device-form','devices',schema.device);
    const btn = document.querySelector('#add-device-form button');

    btn.addEventListener("click", async function(e) {
      form.style.display = "none";
      let params = {}
      const inputs = document.querySelectorAll('#add-device-form input');
      for (let input of inputs){
          params[`${input.name}`] = input.value; 
        }
      console.log(params)
      const device = await addOrUpdateDevice(client, params);
      const html = `<div id=${device.id.id}>${device.name} <button class="update-device" value=${JSON.stringify(device)}>Update</button></div>`;
      document.getElementById('devices').insertAdjacentHTML('beforeend',html);
      })
  }
}