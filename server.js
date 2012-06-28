var httpProxy = require('http-proxy');
var port      = process.env.PORT || 9200;
var servers   = process.env.ELASTIC_SEARCH_SERVERS.split(/,/);
var addresses = [];

for(var server in servers){
  addresses.push({
    host: server,
    port: 9200
  })
}

httpProxy.createServer(function (req, res, proxy) {
  var target = addresses.shift();
  proxy.proxyRequest(req, res, target);
  addresses.push(target);
}).listen(port);