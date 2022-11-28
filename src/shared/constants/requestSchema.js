export const user = {
  email:'',
  authority:'CUSTOMER_USER',
  firstName:'',
  lastName:'',
}
export const asset = {
  name:'',
  type:'',
  label:''
}
export const device = {
  name:'',
  type:'',
  label:''
}
export const customer ={
  "title": "",
  "city": "",
  "address": "",
  "phone": "",
  "email": "",
}

export let FacilityProfile = {

}
export let BuildingProfile = {
  id: {
    id: '',
    entityType: '',
  },
  name: '',
  type: 'BUILDING',
  label: '',
  full: 0,
  beds: [],
};
export let RoomProfile = {
  id:{
    id:'',
    entityType:''
  },
  name:'',
  type:'ROOM',
  label:'',
  full:0,
  beds:[]
}
export let BedProfile = {
  id:{
    id:'',
    entityType:''
  },
  patientId:{
    id:'',
    entityType:''
  },
  name:'',
  type:'BED',
  label:'',
  full:0
}
