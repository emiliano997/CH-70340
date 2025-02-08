import { v4 as uuid } from "uuid";

import { smsService } from "../services/sms.service.js";
import { mailService } from "../services/mail.service.js";
import { SUBJECTS, TYPES } from "../common/constants/mail.js";

const users = [];

class UserController {
  async getAll(req, res) {
    res.json(users);
  }

  async create(req, res) {
    const { email, phone, fullName } = req.body;

    if (!email || !phone || !fullName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = {
      id: uuid(),
      email,
      phone,
      full_name: fullName,
      is_active: false,
    };

    users.push(user);

    try {
      await mailService.sendMail({
        to: email,
        subject: SUBJECTS.WELCOME,
        type: TYPES.WELCOME,
      });

      await smsService.sendMessage({
        to: phone,
        message: `Welcome to our platform, ${fullName}`,
      });

      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error sending email" });
    }
  }
}

export const userController = new UserController();
