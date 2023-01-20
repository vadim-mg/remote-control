import { httpServer } from "./src/http_server/httpServer.js";
import { RemoteControlServer } from "./src/ws_server/wsServer.js";

const HTTP_PORT = 8181;
const WS_PORT = 8080;

httpServer.listen(HTTP_PORT, () => {
  console.log(`Start static http server on the ${HTTP_PORT} port!`);
});

const wss = new RemoteControlServer(WS_PORT);