import { httpServer } from "./src/http_server/index.js";
import { WebSocketServer } from "ws";
import { mouse } from "@nut-tree/nut-js";

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 }); 

wss.on('connection', ws => {
  ws.on('message', function message(data) {
    // console.log( data);
    console.log( data.toString());
  });
  console.log('Connection accepted!')
  ws.send('something');
})