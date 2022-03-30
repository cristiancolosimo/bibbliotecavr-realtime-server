import cors from 'cors';
import express from 'express';
import { Express } from 'express-serve-static-core';
import http from 'http';



export class WebServer{
    express: Express;
    HTTPserver: http.Server;
    constructor(){
        this.express = express();
        this.express.use(cors())
        this.HTTPserver = http.createServer(this.express);
        this.express.get("/",(req,res)=>{
            res.send("Ciao ")
        })
    }

    public getRawHttpServer(){
        return this.HTTPserver;
    }
    public getExpressServer(){
        return this.express;
    }
    public listen(port:number){
        new Promise((resolve, reject)=>{
            this.HTTPserver.listen(port, ()=>{
                resolve(true);
                console.log("Porta aperta a "+port)
                
            })
        })
        
    }
    
    public closeHTTP(){
        this.HTTPserver.close();
    }
    public use(){

    }
    public get(endpoint:string, cb:any ){
        this.express.get(endpoint, cb);
    }
    public post(endpoint:string,cb:any ){
        this.express.post(endpoint,cb);
    }
    
}


