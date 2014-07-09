var LISTEN_PORT = 8000;
var ENDPOINT = "ibl.cloud.bbc.co.uk";
//var ENDPOINT = "open.live.bbc.co.uk";

var extend = require('util')._extend;
var http = require('http');

function funnyChunk(chunk, response) {
    var str = chunk.toString();
    str = str.replace(/BBC/g, 'ITV');
    str = str.replace(/EastEnders/g, 'Coronation St');
    str = str.replace(/Stacey/g, 'Tina');
    return new Buffer(str);
}

function delayChunk(chunk, response, delay) {
    setTimeout(function () {
        response.write(chunk);
    }, delay);
}

http.createServer(function (client_req, client_res) {
    console.log('Request' + new Date());
    var headers = extend({}, client_req.headers);
    headers.host = ENDPOINT;
    headers['accept-encoding'] = 'deflate';
    var options = {
        hostname: ENDPOINT,
        port: 80,
        path: client_req.url,
        method: client_req.method,
        headers: headers
    };

    var buffer = new Buffer(0);

    var proxy = http.request(options, function (res) {
        res.on('data', function (chunk) {
            buffer = Buffer.concat([buffer, chunk]);
        });
        res.on('end', function () {
            console.log("END");
            setTimeout(function () {
                client_res.write(funnyChunk(buffer));
                client_res.end();
            }, 10);
        });
    });

    client_req.pipe(proxy, {
        end: true
    });
}).listen(LISTEN_PORT);
