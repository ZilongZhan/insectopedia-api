import cors from "cors";

const handleCors = cors({
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, origin?: boolean) => void,
  ) => {
    if (!origin) {
      return callback(null, true);
    }

    const allowedOriginPatterns =
      process.env.ALLOWED_ORIGIN_PATTERNS?.split(",");

    if (!allowedOriginPatterns) {
      const error = new Error("Allowed origin patterns not defined");

      return callback(error, false);
    }

    const isAllowedOrigin = allowedOriginPatterns.some((thisOrigin) =>
      origin?.includes(thisOrigin),
    );

    if (isAllowedOrigin) {
      return callback(null, true);
    }

    const error = new Error("Origin not allowed by CORS");

    return callback(error, false);
  },
  credentials: true,
});

export default handleCors;
