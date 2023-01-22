import { httpServer } from "./src/http_server/httpServer.js";
import { wsServer } from "./src/ws_server/wsServer.js";

const HTTP_PORT = 8181;
const WS_PORT = 8080;

httpServer.listen(HTTP_PORT, () => {
  console.log(`Start static http server on the ${HTTP_PORT} port!`);
});

const wss = new wsServer(WS_PORT, () => {
  console.log(`Websocket waits a connection on ${WS_PORT} port!`)
});
