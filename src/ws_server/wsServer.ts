import { WebSocketServer, createWebSocketStream } from "ws";
import { Controller } from "../controllers/controller.js";

class wsServer extends WebSocketServer {

  constructor(port: number, callback?: (() => void) | undefined) {
    super({ port }, callback)

    this.on('connection', (ws, req) => {
      console.log(`Websocket connection started...`)

      ws.on('close', () => {
        console.log('Websocket connection closed. Waiting new connection...')
      })

      const duplex = createWebSocketStream(ws, { decodeStrings: false, encoding: 'utf8' });
      duplex.on('error', console.error);
      duplex.pipe(new Controller((chunk: string) => duplex.write(chunk)))
    })

  }
}



export { wsServer }