import { Server } from "http";
import { configKey } from "../../../config";

const serverConfig = (server: Server) => {
  const startServer = () => {
    const port = parseInt(configKey.PORT, 10);
    server.listen(port, "0.0.0.0", () => {
      console.log(`Server started on http://localhost:${configKey.PORT}`);
    });
  };
  return startServer();
};

export default serverConfig;
