import { WebServer } from "./src/controller/web";
import { WebSocketServer } from "./src/controller/websocket";



const init = async ()=>{
    const Webserver = new WebServer();
    await Webserver.listen(3001);
    const Websocket = new WebSocketServer(Webserver.getRawHttpServer());
    Websocket.startLoop(11.110); //1000/120=8.332   1000/90=11.110  1000/70=14.285  1000/60=16.665 1000/2=500(2 volte al seconod)
    
}

init();