import nodemailer from "nodemailer";
import { CONFIG } from "../config/config.js";

class MailService {
  constructor() {
    console.log(CONFIG.MAIL);

    this.transporter = nodemailer.createTransport({
      host: CONFIG.MAIL.HOST,
      port: CONFIG.MAIL.PORT,
      secure: false,
      auth: {
        user: CONFIG.MAIL.USER,
        pass: CONFIG.MAIL.PASSWORD,
      },
    });
  }

  async getMessageTemplate({ type, email }) {
    let body = `<h1>Hola, ${email}</h1> <br>`;

    switch (type) {
      case "welcome":
        body += `        
        <p style="font-size: 16px; color: red">Te damos la bienvenida a nuestro servicio de mensajes masivos.</p>
        
        <p style="font-size: 16px; color: red">Si tienes alguna pregunta, no dudes en contactarnos.</p>
        
        

        <a href="http://localhost:5000/api/users/activate/codigoSecreto" style="color: red; text-decoration: none;">Activar cuenta</a>
        `;
        break;

      case "activation":
        body += `        
        <p style="font-size: 16px; color: green">Tu cuenta ha sido activada con éxito.</p>
        `;
        break;
    }

    body += `        
    <p style="font-size: 16px; color: red">Saludos,</p>
    <p style="font-size: 16px; color: red">Equipo de Mensajes Masivos</p>
    `;

    return body;
  }

  async sendMail({ to, subject, type }) {
    try {
      const html = await this.getMessageTemplate({ type, email: to });

      const info = await this.transporter.sendMail({
        from: "emi.perez997@gmail.com",
        to,
        subject,
        html,
        attachments: [
          {
            filename: "chrono.jpeg",
            path: "./public/chrono.jpeg",
            cid: "chrono.jpeg",
          },
        ],
      });

      console.log(info);
    } catch (error) {
      console.error(error);
    }
  }
}

export const mailService = new MailService();
