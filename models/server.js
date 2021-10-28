const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor(port) {
        this.app = express()
        this.port = port;
        this.usersPath = '/api/users';

        // Database
        this.connectDb();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    async connectDb() {
        await dbConnection();
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