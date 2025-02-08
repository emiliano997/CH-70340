import { config } from "dotenv";

config();

export const CONFIG = {
  PORT: process.env.PORT || 5000,
  MAIL: {
    USER: process.env.MAILER_USER,
    PASSWORD: process.env.MAILER_PASSWORD,
    HOST: process.env.MAILER_HOST,
    PORT: process.env.MAILER_PORT,
  },
  SMS: {
    SID: process.env.TWILIO_SID,
    TOKEN: process.env.TWILIO_AUTH_TOKEN,
    PHONE: process.env.TWILIO_SMS_NUMBER,
  },
};
