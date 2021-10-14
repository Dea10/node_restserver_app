const Server = require('./models/server');
require('dotenv').config();

const port = process.env.PORT;

const server = new Server(port);

server.listen();