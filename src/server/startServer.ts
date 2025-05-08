import createDebug from "debug";
import chalk from "chalk";
import app from "./app.js";

const debug = createDebug("insectopedia:server:start");

const startServer = (port: number): void => {
  app.listen(port, () => {
    debug("++++++++++++++++++++++++++++++++++++++++++++++");
    debug(
      `🚀 ${chalk.bold.blue("Server running at")} ${chalk.green(
        `http://localhost:${port}`,
      )} 🚀`,
    );
    debug("++++++++++++++++++++++++++++++++++++++++++++++");
  });
};

export default startServer;
