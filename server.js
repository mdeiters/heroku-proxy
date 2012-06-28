var httpProxy = require('http-proxy');
var addresses = [
  {
    host: 'ec2-23-22-237-216.compute-1.amazonaws.com',
    port: 9200
  },
  {
    host: 'ec2-50-17-162-83.compute-1.amazonaws.com',
    port: 9200
  }
];

httpProxy.createServer(function (req, res, proxy) {
  var target = addresses.shift();
  proxy.proxyRequest(req, res, target);
  addresses.push(target);
}).listen(9200);