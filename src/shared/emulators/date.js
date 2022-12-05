// var myDate = '26-02-2012';
// myDate = myDate.split('-');
// var newDate = new Date(myDate[2], myDate[1] - 1, myDate[0]);
// console.log(newDate.getTime());


function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}
console.log(toTimestamp('02/13/2009 23:31:30'));


let unix_timestamp = 1234542690;
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = '0' + date.getMinutes();
// Seconds part from the timestamp
var seconds = '0' + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

console.log(formattedTime);
