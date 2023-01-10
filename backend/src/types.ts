declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      FRONTEND_URL: string;
      // DATABASE
      MONGODB_URL: string;
      // JWT
      JWT_ACCESS_SECRET: string;
    }
  }
}

export default {};
