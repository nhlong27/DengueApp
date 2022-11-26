
const openSocket = async ({client, device, callback}) => {
  console.log('connecting to thingsboard server..')
  let token = await client.connect();

  if(token){
    console.log('creating websocket..')
    client.subscribe(device, callback);

  } else {
    setTimeout(() => openSocket(), 5000);
  }
}

module.exports = {openSocket};
