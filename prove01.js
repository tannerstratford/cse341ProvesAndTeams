const http = require('http');

const routes = require('./routes/prove01-routes');

const server = http.createServer(routes);

server.listen(3000);