import { ServerErrorStructure } from "./types.js";

class ServerError extends Error implements ServerErrorStructure {
  constructor(
    public statusCode: number,
    message?: string,
  ) {
    super(message);
  }
}

export default ServerError;
