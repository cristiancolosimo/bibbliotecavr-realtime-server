
import { Server } from "socket.io";
import { PlayerVR } from '../interface/Player';
import { newPlayer } from "../utils/randomUser";
import { AdvancedSpatialData } from "../interface/SpatialData";
import { UUID } from '../interface/type'
import { Book } from "../interface/db/Book";

/**
 *     id: UUID,
    name: string,
    number_pages: number,
    base_location: string, //minio endpoint

 */

const Books : Array<BookVR>= [
    {  
        id:"1",
        name:"arifuteta_shokugyo",
        base_location:"Arifureta_Shokugyou_de_Sekai_Saikyou",
        number_pages:8,
        open:false, pageleft:0, pageright:1, 
        spatialData:{
            type:"object",
            rotation:{x:0,y:0,z:0},
            position: {x:0,y:0,z:0}
        }
    }/*,
    {  
        id:"2",
        name:"dandadan",
        base_location:"Dandadan_Volume_01_Capitolo_01",
        number_pages:64,
        open:false, pageleft:0, pageright:1, 
        spatialData:{
            type:"object",
            rotation:{x:0,y:0,z:0},
            position: {x:0,y:0,z:-0.14}
        }
    },
    {  
        id:"3",
        name:"kaiju no 8",
        base_location:"Kaiju_No8_Volume_01_Capitolo_01",
        number_pages:54,
        open:false, pageleft:0, pageright:1, 
        spatialData:{
            type:"object",
            rotation:{x:0,y:0,z:0},
            position: {x:0,y:0,z:-0.14*2}
        }
    },
    {  
        id:"4",
        name:"shingeki no kyojin",
        base_location:"Shingeki_no_Kyojin_Volume_01_Capitolo_01",
        number_pages:54,
        open:false, pageleft:0, pageright:1, 
        spatialData:{
            type:"object",
            rotation:{x:0,y:0,z:0},
            position: {x:0,y:0,z:-0.14*3}
        }
    }*/
    
];


interface ObjectVR{
    id: UUID,
    spatialData: AdvancedSpatialData,
    
}

interface BookVR extends ObjectVR, Book{
    open: boolean,
    pageleft: number,
    pageright: number
}

export class WebSocketServer{
    onlinePlayers : Map<string, PlayerVR>;
    objectLocation: Map<string, BookVR>
    loop: NodeJS.Timeout|null;
    io: any;
    constructor(HTTPserver:any){
        this.onlinePlayers = new Map<string, PlayerVR>();
        this.objectLocation = new Map<UUID, BookVR>();
        Books.forEach(el=>this.objectLocation.set(el.id,el));
        this.io = new Server(HTTPserver, { cors: { origin: "*" }/*, transports: ["websocket"] */});
        this.io.on("connection",this.onConnection.bind(this));
        this.loop = null;

        console.log("Websocket Server started");
    }



    private onConnection= (socket:any)=>{
        const playerData = newPlayer();
        this.onlinePlayers.set(playerData.id, playerData);
        console.log("userconnect", playerData.id);

        socket.on("location_player", (msg: any) => this.onLocation_player(playerData,socket,msg));
        socket.on("location_object", (msg: any) => this.onLocation_object(playerData, socket, msg))
        socket.emit('login', playerData);
        
        socket.on("request_login", (msg: any) => { socket.emit('login', playerData);})

        socket.on('chat message', (msg: any) => this.onChatMessage(playerData,socket,msg));

        // called when the underlying connection is closed  });
        socket.conn.on("close", (msg: any) => this.onClose(playerData,socket,msg));
    }


    private onChatMessage(playerData: PlayerVR, socket: any, msg: any){
        //console.log(playerData.id, msg);
        this.io.emit('chat message', msg);
    }

    private onLocation_object(playerData: PlayerVR, socket: any, msg: any){
        this.objectLocation.set(msg.id, msg)
        console.log(msg)
    }
    private onLocation_player(playerData: PlayerVR, socket: any, msg: PlayerVR){
        //console.log(msg)

        this.onlinePlayers.set(playerData.id, msg);
    }
    private onRequest_login(playerData: any, socket: any, msg: any){
        
    }
    private onClose(playerData: PlayerVR,socket: any, msg: any){
        //quando ci si disconnette c'è bisogno che si elimina subito il player dalla map dei player connessi/online
        this.onlinePlayers.delete(playerData.id);
        //e successivamente aggiorna la località del player nel database

    }
    public getIO(){
        return this.io;
    }
    public startLoop(tick?:number){
        if(!tick) tick = 11.110;
        if(this.loop == null)
        this.loop = setInterval(() => {
            this.io.emit('location_players', Object.fromEntries(this.onlinePlayers));
            this.io.emit('location_objects', Object.fromEntries(this.objectLocation))
            //console.log(this.objectLocation.get("1"))
            //console.log(Object.fromEntries(this.onlinePlayers))
        }, tick/*500*/); //tickrate 90 hz 1000/90
        console.log("Loop staterd")
    }
    public stopLoop(){
        if(this.loop !== null)
        clearInterval(this.loop);
        this.loop = null;
        console.log("Loop stopped")
    }
}



/**
 * quando si disconnette l'utente, salva i dati di posizione della testa
 * quando si connette prende i dati tramite(id) di posizione della testa
 * i dati di posizione sono: posizion, rotation, roomid,
 * i roomid prende la struttura della room, oggetti, libri, posizione oggetti
 * 
 * poi tramite il loop si ottengono i dati di posizione dei player e dei oggetti.
 * 
 * La chat funziona in modo che si ricevono i messaggi in arrivo, e che vengono brodcastati in una room(quindi c'è un canale di invio e uno di ricezione/brodcast)
 * 
 */