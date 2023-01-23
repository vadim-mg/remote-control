import { WebSocketServer, createWebSocketStream } from "ws";
import { Controller } from "../controllers/controller.js";

class wsServer extends WebSocketServer {

  constructor(port: number, callback?: (() => void) | undefined) {
    super({ port }, callback)

    this.on('connection', (ws, req) => {
      console.log(`Websocket connection started...`)

      ws.on('close', () => console.log('Websocket connection closed. Waiting new connection...'))
      ws.on("error", err => console.error(err));

      const duplex = createWebSocketStream(ws, { decodeStrings: false, encoding: 'utf8' });
      duplex.on('error', err => console.error(err));
      duplex.on('data', data => {
        console.log(`Received: ${data}`)
        const writeToDuplex = (chunk: string) => duplex.write(chunk)
        const controller = new Controller(writeToDuplex)
        controller.write(data)
      })
    })
  }
}


export { wsServer }