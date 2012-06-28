var httpProxy = require('http-proxy');
var port      = process.env.PORT || 8080;
var servers   = process.env.ELASTIC_SEARCH_SERVERS.split(",");
var addresses = [];

for(var index in servers){
  console.log("Proxying " + servers[index]);
  addresses[index] = {
    host: servers[index],
    port: 9200
  };
}

httpProxy.createServer(function (req, res, proxy) {
  var target = addresses.shift();
  proxy.proxyRequest(req, res, target);
  addresses.push(target);
}).listen(port);