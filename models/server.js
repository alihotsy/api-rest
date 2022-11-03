const express = require('express');
const morgan = require('morgan');
const dbConnection = require('../database/dbConnection');

const app = express();

class Server {
    constructor(){
      this.port = process.env.PORT;
      this.projectTypesRoute = '/api/project-type';
      this.clientsRoute = '/api/client';
      this.stagesRoute = '/api/stage';
      this.universitiesRoute = '/api/university';
    //   this.projectsRoute = '/api/project';

      this.middlewares();
      this.connection();
      this.routes();
      this.listen();
    }
    middlewares(){
        app.use(morgan('dev'));
        app.use(express.json());
    }

    async connection(){
      await dbConnection();
    }
    routes(){
        app.use(this.projectTypesRoute, require('../src/routes/project-type.router'));
        app.use(this.clientsRoute, require('../src/routes/client.router'));
        app.use(this.stagesRoute, require('../src/routes/stage.router'));
        app.use(this.universitiesRoute, require('../src/routes/university.router'));
        // app.use(this.projectsRoute, require('../src/routes/project.router'));
    }

    listen(){
        app.listen(this.port, () => {
            console.log('Listening to port',this.port);
        })
    }
}
module.exports = Server;