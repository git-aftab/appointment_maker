declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE: string;
    BETTER_AUTH_SECRET: string;
    BETTER_AUTH_URL: string;
    NEXT_PUBLIC_BETTER_AUTH_URL: string;
  }
}
