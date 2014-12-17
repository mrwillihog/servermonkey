var LISTEN_PORT = 8000;
var ENDPOINT = "ibl.cloud.bbc.co.uk";

var iblProxy = require('./iblProxy');

var proxy = iblProxy.createServer({
    endpoint: ENDPOINT,
    listen_port: LISTEN_PORT
});

proxy.addBodyFilter(function (body, callback) {
    var str = body.toString();
    str = str.replace(/BBC/g, 'ITV');
    str = str.replace(/EastEnders/g, 'Coronation St');
    str = str.replace(/Stacey/g, 'Tina');
    str = str.replace(/ichef/g, 'masterchef');
    return new Buffer(str);
});

proxy.addHeaderFilter(function (key, value) {
    if (key === 'x-powered-by') {
        return false;
    }
    if (key === 'cache-control') {
        return value + ", stale-if-error=21600";
    }
    return value;
});

//proxy.setDelay(10);


