import { WebSocketServer } from "ws";
import { controller } from "../controllers/controller.js";


class RemoteControlServer extends WebSocketServer {

  constructor(port: number) {
    super({ port })

    this.on('connection', ws => {
      console.log('Connection accepted!')
      ws.on('message', async (data) => {
        console.log(data)
        const message = data.toString()
        const result = await controller(message)
        ws.send(result || message)
      });
    })

    this.on('close', () => {
      // ws.send('Good bye!')
      console.log('Good bye!')
    })
  }
}



export { RemoteControlServer }