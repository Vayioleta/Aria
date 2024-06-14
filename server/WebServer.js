import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import WebApi from "./WebApi.js";
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: ".env" });
const WebServerConfig = {
  ONLY_LOCALHOST: process.env.ONLY_LOCALHOST,
};

class WebServer {

    constructor({ port }){        
        this.app = express();
        this.port = port;
        this.define_middlewares();
        this.listen();
    }

    // Middleware para verificar la IP de origen
    verify_local_ip(req, res, next){
        const ip = req.ip;
        if (ip === '127.0.0.1' || ip === '::1') {
            next(); // La IP es localhost, continuar con la solicitud
        } else {
            res.status(403).send('Access denied: requests from this IP are not allowed');
        }
    };

    define_middlewares(){
        if(WebServerConfig.ONLY_LOCALHOST == "true"){
            console.log("WebServer | Config | ONLY_LOCALHOST | true");
            this.app.use(this.verify_local_ip); //permitir solo iplocal
        }
        this.app.use(express.static(path.join(__dirname, '../frontend/build')));
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(express.json());
        this.open_end_points();        
    }

    listen(){ // open server     
        this.app.listen(this.port, () => {
            console.log(`WebServer | PORT | ${this.port}`);
        });
    }

    open_end_points(){ //api
        this.app.use('/api', WebApi);
    }

}//end webserver

export default WebServer;