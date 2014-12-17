var LISTEN_PORT = 8000;
var ENDPOINT = "ibl.api.bbci.co.uk";

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

//proxy.setDelay(10);


