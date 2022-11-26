const axios = require('axios').default;
const jwt = require('jwt-decode').default;

const api = (host, token = null) => axios.create({
    baseURL: `http://${host}`,
    responseType: "json",
    headers: {
      'X-Authorization': `Bearer ${token}`
    }
});


class tbClient{

  constructor(config){

    this.config = config;
    this.api = api(config.host, config.token);

    if(config.token){
      this.token = config.token;
    } else {
      this.token = null;
    }

  }
  // connect to Thingsboard
  // return {token: token, user: user} or null
  async connect(isPublic = false){

    let result;

    if(isPublic === true){

      result = await this.api.post('/api/auth/login/public', { publicId: this.config.publicId })
        .then(function (response) {

          return {
            token: response.data.token,
            user: null
          }

        })
        .catch(function (error) {
          return null;
        });

    } else {

      result = await this.api.post('/api/auth/login', { username: this.config.username, password: this.config.password })
        .then(function (response) {

          return {
            token: response.data.token,
            user: JSON.stringify(jwt(response.data.token))
          };

        })
        .catch(function (error) {
          console.error(error)
          return null;
        });

    }

    if(result){
      this.token = result.token;
      this.api = api(this.config.host, result.token);
      return result;
    } else {
      return null;
    }

  }
  //disconnect
  disconnect(){
    this.token = null;
    return null;
  }

// WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
// WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
// WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
// WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
// WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
// WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
// WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW

  getCustomers({textSearch, sortOrder, sortProperty}= {textSearch:'', sortOrder:'', sortProperty:''}){
    console.log('getCustomers')
    return this.api.get(`/api/customers?page=0&pageSize=10${textSearch}`)
      .then(response => {
        response && console.log('return:'); console.log( response.data);
        return response.data;
      })
      .catch(error=>{
        console.log(error);
      })
  }

  getCustomerUsers(customerId, {textSearch, sortProperty, sortOrder} = {textSearch:'',sortOrder:'',sortProperty:''}){
    console.log('getCustomerUsers')
    return this.api.get(`/api/customer/${customerId}/users?page=0&pageSize=10${textSearch}${sortOrder}${sortProperty}`)
    .then(response => {
      response && console.log('return:'); console.log( response.data);
      return response.data;
    })
    .catch(error=>{
      console.log(error);
    })
  }

  getAllUsers({textSearch, sortProperty, sortOrder} = {textSearch:'',sortOrder:'',sortProperty:''}){
    console.log('getAllUsers')
    return this.api.get(`/api/users?page=0&pageSize=10${textSearch}${sortOrder}${sortProperty}`)
    .then(response => {
      response && console.log('return:'); console.log( response.data);
      return response.data;
    })
    .catch(error=>{
      console.log(error);
    })
  }

  async createUpdateCustomer(params){
    if (params.id) console.log('updateCustomer')
    else console.log('createCustomer')
    const result = await this.api.post(`/api/customer`,params)
      .then(response => {
        response && console.log('return:'); console.log( response.data);
        return response.data;
      })
      .catch(error=>{
        console.log(error);
        return null;
      })
    return result;
  }

  async saveUser(params){
    if (params.id) console.log('updateUser')
    else console.log('saveUser')
    const result = await this.api.post(`/api/user?sendActivationMail=true`,params)
      .then(response => {
        response && console.log('return:'); console.log( response.data);
        return response.data;
      })
      .catch(error=>{
        console.log(error);
        return null;
      })
    return result;
  }
  async deleteCustomer(customerId){
    console.log('deleteCustomer')
    await this.api.delete(`/api/customer/${customerId}`)
      .then(response => {
        console.log('deleted customer')
      })
      .catch(error=>{
        console.log(error);
      })
  }
  async deleteUser(userId){
    console.log('deleteUser')
    await this.api.delete(`/api/user/${userId}`)
      .then(response => {
        console.log('deleted user')
      })
      .catch(error=>{
        console.log(error);
      })
  }

  getAssets({textSearch, sortProperty, sortOrder}= {textSearch:'',sortOrder:'',sortProperty:''}){
    console.log('getAssets')
    return this.api.get(`/api/tenant/assets?page=0&pageSize=10${textSearch}${sortOrder}${sortProperty}`)
      .then(response => {
        response && console.log('return:'); console.log( response.data);
        return response.data;
      })
      .catch(error=>{
        console.log(error);
      })
  }

  
  getAssetByName(name){
    console.log('getAssetByName')
    return this.api.get(`/api/tenant/assets?assetName=${name}`)
    .then(response => {
      response && console.log('return:'); console.log( response.data);
      return response.data;
    })
    .catch(error=>{
      console.log(error);
    })
  }
  
  async createUpdateAsset(params){
    if (params.id) console.log('updateAsset')
    else console.log('createAsset')
    const result = await this.api.post(`/api/asset`,params)
      .then(response => {
        response && console.log('return:'); console.log( response.data);
        return response.data;
      })
      .catch(error=>{
        console.log(error);
        return null;
      })
    return result;
  }

  getAssetById(assetId){
    console.log('getting asset')
    return this.api.get(`/api/asset/${assetId}`)
      .then(response => {
        response && console.log('return:'); console.log( response.data);
        return response.data;
      })
      .catch(error=>{
        console.log(error);
      })
  }

  async deleteAsset(assetId){
    console.log('deleteAsset')
    await this.api.delete(`/api/asset/${assetId}`)
      .then(response => {
        console.log('deleted asset')
      })
      .catch(error=>{
        console.log(error);
      })
  }

  getDevices({textSearch, sortProperty, sortOrder} = {textSearch:'',sortOrder:'',sortProperty:''}){
    console.log('getDevices')
    return this.api.get(`/api/tenant/devices?page=0&pageSize=10${textSearch}${sortOrder}${sortProperty}`)
      .then(response => {
        response && console.log('return:'); console.log( response.data);
        return response.data;
      })
      .catch(error=>{
        console.log(error);
      })
  }
  
  async createUpdateDevice(params){
    if (params.id) console.log('updateDevice')
    else console.log('createDevice')
    const result = await this.api.post(`/api/device`,params) //accessToken will be auto generated
      .then(response => {
        response && console.log('return:'); console.log( response.data);
        return response.data;
      })
      .catch(error=>{
        console.log(error);
        return null;
      })
    return result;
  }

  async deleteDevice(deviceId){
    console.log('deleteDevice')
    await this.api.delete(`/api/device/${deviceId}`)
      .then(response => {
        console.log('deleted device')
      })
      .catch(error=>{
        console.log(error);
      })
  }

  getCustomerAssets(customerId, {textSearch, sortProperty, sortOrder} = {textSearch:'',sortOrder:'',sortProperty:''}){
    console.log('getCustomerAssets')
    return this.api.get(`/api/customer/${customerId}/assets?page=0&pageSize=10${textSearch}${sortOrder}${sortProperty}`)
      .then(response => {
        response && console.log('return:'); console.log( response.data);
        return response.data;
      })
      .catch(error=>{
        console.log(error);
      })
  }



  async assignDevice(customerId, deviceId){
    console.log('assignDevice');
    const result = await this.api.post(`/api/customer/${customerId}/device/${deviceId}`)
      .then(response=>{
        response&& console.log('return:'); console.log( response.data);
        return response.data;
      })
      .catch(error=>{
        console.log(error);
        return null;
      })
    return result;
  }
  async assignAsset(customerId, assetId){
    console.log('assignAsset');
    const result = await this.api.post(`/api/customer/${customerId}/asset/${assetId}`)
      .then(response=>{
        response&& console.log('return:'); console.log( response.data);
        return response.data;
      })
      .catch(error=>{
        console.log(error);
        return null;
      })
    return result;
  }
  async unassignAsset(assetId){
    console.log('unassignAsset');
    const result = await this.api.delete(`/api/customer/asset/${assetId}`)
      .then(response=>{
        response&& console.log('return:'); console.log( response.data);
        return response.data;
      })
      .catch(error=>{
        console.log(error);
        return null;
      })
    return result;
  }
  async unassignDevice(deviceId){
    console.log('unassignDevice');
    const result = await this.api.delete(`/api/customer/device/${deviceId}`)
      .then(response=>{
        response&& console.log('return:'); console.log( response.data);
        return response.data;
      })
      .catch(error=>{
        console.log(error);
        return null;
      })
    return result;
  }

  async findRelatedDevices(params){
    console.log('findRelatedDevices');
    const result = await this.api.post('/api/devices', params)
      .then(response=>{
        response&& console.log('return:'); console.log( response.data);
        return response.data;
      })
      .catch(error=>{
        console.log(error);
        return null;
      })
    return result;
  }

  // getTenantDevices(params = {}, callback = null){

  //   const pageSize = params.pageSize || 100;
  //   const page = params.page || 0;
  //   const sortProperty = params.sortProperty || 'name';
  //   const sortOrder = params.sortOrder || 'ASC'

  //   return this.api.get(`/api/tenant/devices?pageS0e=${pageSize}&page=${page}&sortProperty=${sortProperty}&sortOrder=${sortOrder}`)
  //     .then(function (response) {
  //       callback && callback(response.data.data)
  //       return response.data.data

  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //       callback && callback(null);
  //       return null;
  //     });
  // }

  //get timeseries keys|attributes keys
  // async getKeys(params, callback = null){

  //   const entityId = params.entityId;

  //   if(!entityId){
  //     console.error('entityId is undefined');
  //     callback && callback(null);
  //     return null;
  //   }

  //   const scope = params.scope || 'timeseries';


  //   const keysFunction = (args) => {

  //     return this.api.get(`/api/plugins/telemetry/DEVICE/${args.entityId}/keys/${args.scope}`)
  //       .then(function (response) {
  //         callback && callback(response.data);
  //         return response.data
  //       })
  //       .catch(function (error) {
  //         callback && callback(null);
  //         return null
  //       });
  //   }

  //   switch (scope) {

  //     case 'client':
  //       params.scope = 'attributes/CLIENT_SCOPE';
  //       return keysFunction(params);

  //     case 'shared':
  //       params.scope = 'attributes/SHARED_SCOPE';
  //       return keysFunction(params);

  //     case 'server':
  //       params.scope = 'attributes/SERVER_SCOPE';
  //       return keysFunction(params);

  //     case 'timeseries':
  //       params.scope = 'timeseries';
  //       return keysFunction(params);

  //     default:
  //       params.scope = 'timeseries'
  //       return keysFunction(params);

  //   }

  // }

  //get attributes by scope
  // getAttributesByScope(params, callback = null){

  //   // params.scope: CLIENT_SCOPE | SHARED_SCOPE | SERVER_SCOPE

  //   const entityId = params.entityId;
  //   if(!entityId){
  //     console.log('undefined entityId')
  //     callback(null);
  //     return null;
  //   }

  //   const scope = params.scope || 'CLIENT_SCOPE';

  //   return this.api.get(`/api/plugins/telemetry/DEVICE/${params.entityId}/values/attributes/${scope}?keys=${params.keys.join(',')}`)
  //     .then(function (response) {
  //       callback && callback(response.data);
  //       return response.data
  //     })
  //     .catch(function (error) {
  //       callback && callback(null);
  //       return null
  //     });
  // }


  // async deleteEntityKeys(params, callback = null){

  //   const entityId = params.entityId;
  //   const keys = params.keys || [];
  //   const scope = params.scope || "";
  //   const olderThan = Number(params.olderThan || 0); //timestamp seconds

  //   //using fetch for delete method, had issues with testing server using axios. OPTIONS.
  //   const baseUrl = `https://${this.config.host}/api/plugins/telemetry/DEVICE/${entityId}`;
  //   let url;

  //   switch (scope) {
  //     case 'timeseries':
  //       if(olderThan === 0){

  //         url = `${baseUrl}/timeseries/delete?keys=${keys.join(',')}&deleteAllDataForKeys=true`;

  //       } else {

  //         const startTs = 0;
  //         const endTs = Date.now() - (olderThan*1000);
  //         url = `${baseUrl}/timeseries/delete?keys=${keys.join(',')}&startTs=${startTs}&endTs=${endTs}&&deleteAllDataForKeys=false`;

  //       }
  //       break;
  //     case 'client':
  //       url = `${baseUrl}/CLIENT_SCOPE?keys=${keys.join(',')}`;
  //       break;
  //     case 'shared':
  //       url = `${baseUrl}/SHARED_SCOPE?keys=${keys.join(',')}`;
  //       break;
  //     case 'server':
  //       url = `${baseUrl}/SERVER_SCOPE?keys=${keys.join(',')}`;
  //       break;
  //     default:
  //       console.error('Unrecognized scope');
  //       return null;
  //   }

  //   try {

  //     let response = await fetch((url),
  //       {
  //         method: "DELETE",
  //          headers: {
  //           'X-Authorization': `Bearer ${this.token}`
  //         }
  //       });

  //       callback && callback(response);
  //       return response;

  //   } catch (e) {
  //     alert(e);
  //     callback && callback(null)
  //     return null;
  //   }


  // }

  getTimeseries(params, callback = null){

    const now = Date.now();
    const entityId = params.entityId;
    const keys = params.keys || [];
    const limit = params.limit || 500;
    const agg = params.agg || 'AVG';
    const interval = params.interval || 60000;
    const startTs = params.startTs || now-3600000;
    const endTs = params.endTs || now;
    const useStrictDataTypes = params.useStrictDataTypes || true;

    const getParams = {
      keys: keys.join(','),
      limit: limit,
      agg: agg,
      interval: interval,
      startTs: startTs,
      endTs: endTs,
      useStrictDataTypes: useStrictDataTypes
    }

    return this.api.get(
      `/api/plugins/telemetry/DEVICE/${entityId}/values/timeseries`, {params: getParams})
      .then(function (response) {
        callback && callback(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        callback && callback(null);
        return null;
      });

  }


  //websocket
  subscribe(params, callback){

    const entityId = params.entityId;
    const cmdId = params.cmdId || 10;

    const wssUrl = `wss://${this.config.host}/api/ws/plugins/telemetry?token=${this.token}`;
    var webSocket = new WebSocket(wssUrl);

    webSocket.onopen = function () {
        var object = {
          tsSubCmds: [
            {
              entityType: "DEVICE",
              entityId: entityId,
              scope: "LATEST_TELEMETRY",
              cmdId: cmdId
            }
          ],
          historyCmds: [],
          attrSubCmds: []
        };
        var data = JSON.stringify(object);
        webSocket.send(data);
        //callback(data);
    };

    webSocket.onmessage = function (event) {
        var received_msg = event.data;
        callback(JSON.parse(received_msg));
    };

    webSocket.onclose = function() {
        console.log('WEBSOCKET CLOSED');
        webSocket = null;
        callback(null);
    };

  }

  getUser(){
    return this.api.get(`/api/auth/user`)
      .then(function (response) {
        response && console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      });
  }

}


module.exports = tbClient;