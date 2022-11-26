import { addOrUpdateNurse } from '../api/doctor/nurses';
import { addOrUpdatePatient } from '../api/doctor/dashboard';
import {createForm} from './createForm';
import * as schema from '../constants/requestSchema';
import { addOrUpdateFacilities } from '../api/doctor/facilities';
import { addOrUpdateDevice } from '../api/doctor/devices';

export const updatePatient = (client, eventTarget) =>{
  const existingValue = JSON.parse(eventTarget.value);
  const form = document.getElementById('update-patient-form');
  if (form){
    form.remove();
  }else{
    const form = createForm('update-patient-form', eventTarget.parentNode.id, schema.customer);

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", 'device');
    input.setAttribute("placeholder", 'Enter your device_id');
    
    const btn = document.querySelector('#update-patient-form button');
    form.insertBefore(input, btn);
    
    btn.addEventListener("click", async function(e) {
      form.style.display = "none";
      let params = {}
      let deviceID = '';
      const inputs = document.querySelectorAll('#update-patient-form input');
      for (let input of inputs){
        if (input.id === 'device'){
          deviceID = input.value;
        }else{
          params[`${input.name}`] = input.value; 
        }
      }
      params = {...existingValue, ...params}
      console.log(params)
      console.log(deviceID)
      const customer = await addOrUpdatePatient(client, params);
      eventTarget.parentNode.innerHTML =`Title:${customer.title} <br/>Phone:${customer.phone} <br/> Email:${customer.email} <button class="update-customer" value=${JSON.stringify(customer)}>Update</button>`;  
    })
  }
}


export const updateNurse = (client, eventTarget) =>{
  const existingValue = JSON.parse(eventTarget.value);
  const form = document.getElementById('update-nurse-form');
  if (form){
    form.remove();
  }else{
    const form = createForm('update-nurse-form',eventTarget.parentNode.id,schema.user);

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", 'asset');
    input.setAttribute("placeholder", 'Enter your asset_id');
    
    const btn = document.querySelector('#update-nurse-form button');
    form.insertBefore(input, btn);
    
    btn.addEventListener("click", async function(e) {
      form.style.display = "none";
      let params = {}
      let assetID = '';
      const inputs = document.querySelectorAll('#update-nurse-form input');
      for (let input of inputs){
        if (input.id === 'asset'){
          assetID = input.value;
        }else{
          params[`${input.name}`] = input.value; 
        }
      }
      params = {...existingValue, ...params}
      console.log(params)
      console.log(assetID)
      const user = await addOrUpdateNurse(client, params);
      eventTarget.parentNode.innerHTML =`${user.email}<button class="update-nurse" value=${JSON.stringify(user)}>Update</button>`;
    })
  }
}

export const updateFacility = (client, eventTarget) =>{
  console.log(eventTarget.value)
  const existingValue = JSON.parse(eventTarget.value);

  const form = document.getElementById('update-facility-form');
  if (form){
    form.remove();
  }else{
    const form = createForm('update-facility-form',eventTarget.parentNode.id,schema.asset);
    const btn = document.querySelector('#update-facility-form button');
    
    btn.addEventListener("click", async function(e) {
      form.style.display = "none";
      let params = {}
      const inputs = document.querySelectorAll('#update-facility-form input');
      for (let input of inputs){
          params[`${input.name}`] = input.value; 
        }
      params = {...existingValue, ...params}

      console.log(params)
      const asset = await addOrUpdateFacilities(client, params);
      eventTarget.parentNode.innerHTML =`${asset.name}<button class="update-facility" value=${JSON.stringify(asset)}>Update</button>`;
      })
  }
}

export const updateDevice = (client,eventTarget) =>{
  console.log(eventTarget.value)
  const existingValue = JSON.parse(eventTarget.value);

  const form = document.getElementById('update-device-form');
  if (form){
    form.remove();
  }else{
    const form = createForm('update-device-form',eventTarget.parentNode.id,schema.device);
    const btn = document.querySelector('#update-device-form button');

    btn.addEventListener("click", async function(e) {
      form.style.display = "none";
      let params = {}
      const inputs = document.querySelectorAll('#add-device-form input');
      for (let input of inputs){
          params[`${input.name}`] = input.value; 
        }
      params = {...existingValue, ...params}

      console.log(params)
      const device = await addOrUpdateDevice(client, params);
      eventTarget.parentNode.innerHTML =`${device.name}<button class="update-device" value=${JSON.stringify(device)}>Update</button>`;
      })
  }
}