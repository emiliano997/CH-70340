import { config } from "dotenv";
import { Command } from "commander";

const program = new Command();
program.option("-e, --env <string>", "Environment", "dev");

program.parse();

const env = program.opts().env;
let path;

switch (env) {
  case "development":
  case "dev":
    path = ".env.development";
    break;

  case "production":
  case "prod":
    path = ".env.production";
    break;

  default:
    path = ".env";
}

config({
  path,
});

export const CONFIG = {
  PORT: process.env.PORT || 3000,
  DB: {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    NAME: process.env.DB_NAME,
  },
  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXPIRES: process.env.JWT_EXPIRES,
  },
  GITHUB: {
    CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  },
  CLOUDINARY: {
    CLIENT_ID: process.env.CLOUDINARY_CLIENT_ID,
  },
};
