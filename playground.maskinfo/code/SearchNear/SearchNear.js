var http    = require("http");
var console = require("console");
var config  = require("config");

const ip = config.get('ip');
const port = config.get('port');
module.exports.function = function searchNear (location) {
  var baseurl = "http://"+ip+":"+port+"/geo?"
  var query = {
    x: location.latitude,
    y: location.longitude
  }
  var options = {
    format: 'json',
    cacheTime: 0
  }
  var url = baseurl+http.makeQueryString(query)
  let ret = http.getUrl(url, options);
  
  return ret;
}
