import { CONFIG } from "../config/config.js";

import { contactDao as contactDaoMongo } from "./mongodb/contact.dao.js";
import { contactDao as contactDaoMemory } from "./memory/contact.dao.js";

function getDao(persistance) {
  switch (persistance) {
    case "mongodb":
      return {
        contactDao: contactDaoMongo,
      };
    case "memory":
      return {
        contactDao: contactDaoMemory,
      };

    default:
      return {
        contactDao: contactDaoMongo,
      };
  }
}

export const { contactDao } = getDao(CONFIG.PERSISTANCE);
