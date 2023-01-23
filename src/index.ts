import { httpServer } from "./http_server/httpServer.js";
import { wsServer } from "./ws_server/wsServer.js";

const HTTP_PORT = 8181;
const WS_PORT = 8080;

httpServer.listen(HTTP_PORT, () => {
  console.log(`Start static http server on the ${HTTP_PORT} port!`);
});

const wss = new wsServer(WS_PORT, () => {
  console.log(`Websocket waits a connection on ${WS_PORT} port!`)
});

process.on('SIGINT', () => {
  console.log("Server closes connections")
  wss.clients.forEach((client) => client.close());
  wss.close()
  httpServer.close()
})



