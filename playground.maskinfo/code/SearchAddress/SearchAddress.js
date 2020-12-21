var http    = require("http");
var console = require("console");
var config  = require("config");

const ip = config.get('ip');
const port = config.get('port');
module.exports.function = function searchAddress (Address) {
  console.log(config);
  var baseurl = "http://"+ip+":"+port+"/address?"
  var query = {
    address: Address
  }
  var options = {
    format: 'json',
    cacheTime: 0
  }
  var url = baseurl+http.makeQueryString(query)
  let ret = http.getUrl(url, options);
  
  return ret;
}
