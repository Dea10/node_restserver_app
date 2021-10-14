const express = require('express');
var cors = require('cors')

class Server {

    constructor(port) {
        this.app = express()
        this.port = port;
        this.usersPath = '/api/users';

        this.middlewares();

        // routes
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // body reading and parsing
        this.app.use(express.json());

        // public directory
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/users'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        });
    }

}

module.exports = Server;