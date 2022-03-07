import cors from 'cors';
import express from 'express';
import http from 'http';
import {
    Server
} from "socket.io";
import {
    uuid
} from 'uuidv4'
const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server,{
    // enable cors
    cors: {    origin: "*"  }
  });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


interface SpatialData{
    x: number,
    y: number,
    z: number
}
interface AdvancedSpatialData{
    type: "controller"| "hand" | "headset",
    rotation : SpatialData,
    position: SpatialData,
}
interface Player {
    id: string,
    color:string,
    head:AdvancedSpatialData,
    leftController : AdvancedSpatialData,
    rightController: AdvancedSpatialData
}


let  Players : Map<string, Player>= new Map();
//let Object = new Map();

const random = () => Math.floor(Math.random()*16777215).toString(16);
io.on('connection', (socket) => {
    const playerData: Player = {
        id: uuid(),
        color :"#"+random(),
        head: {
            type:"headset",
            position:{
                x:0,
                y:0,
                z:0
            },
            rotation: {
                x:0,
                y:0,
                z:0
            }
        },
        leftController: {
            type:"controller",
            position:{
                x:0,
                y:0,
                z:0
            },
            rotation: {
                x:0,
                y:0,
                z:0
            }
        },
        rightController: {
            type:"controller",
            position:{
                x:0,
                y:0,
                z:0
            },
            rotation: {
                x:0,
                y:0,
                z:0
            }
        }
    };
    
    Players.set(playerData.id, playerData);
    socket.on("location_player", msg =>{
        Players.set(playerData.id, msg);  
    });

    socket.on("location_object", msg=>{
        console.log(msg);
    })
    socket.emit('login', playerData);
    socket.on("request_login",()=>{
        socket.emit('login', playerData);
    })
    console.log("userconnect",playerData.id);

    socket.on('chat message', msg => {
        console.log(playerData.id, msg);
        io.emit('chat message', msg);
    });
    socket.conn.on("close", (reason) => {    // called when the underlying connection is closed  });
        Players.delete(playerData.id);
    });
});

setInterval(()=>{
    io.emit('location_players', Object.fromEntries(Players));
    //console.log(JSON.stringify(Object.fromEntries(Players)))
}, /*500*/11.110); //tickrate 90 hz


server.listen(3001, () => {
    console.log(`Socket.IO server running at http://localhost:${3001}/`);
});