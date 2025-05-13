declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: number;
    DB_URI?: string;
    ALLOWED_ORIGIN_PATTERNS?: string;
  }
}
