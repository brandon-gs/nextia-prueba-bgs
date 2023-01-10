declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      FRONTEND_URL: string;
    }
  }
}

export default {};
