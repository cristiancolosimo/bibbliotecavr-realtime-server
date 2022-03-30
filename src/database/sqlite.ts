import sqlite3 from 'sqlite3'
import { Database, open } from 'sqlite'

(async () => {
    const db = await open({
      filename: '/tmp/database.db',
      driver: sqlite3.cached.Database
    })
})()


export class Sqlite{
    database: Database<sqlite3.Database, sqlite3.Statement> = null;
    path = "";
    constructor(type:"memory"| "location", path:null|string){
        if(type == "memory") throw console.error("Non implementato");
        if(type  == "location" && typeof path == "string") {
            this.path = path;
            //check if path is usable
        }else throw console.error("Errore creazione database");
        
    }

    public async open(){
        this.database = await open({
            filename: this.path,
            driver: sqlite3.Database
          });
    }

    public async createDB(){
        await this.database.exec('CREATE TABLE tbl (col TEXT)');
        await this.database.exec('INSERT INTO tbl VALUES ("test")');
    }



    
    public async close(){
        await this.database.close()
    }
}