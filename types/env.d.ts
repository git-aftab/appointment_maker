declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE: string;
    BETTER_AUTH_SECRET: string;
    BETTER_AUTH_URL: string;
  }
}
