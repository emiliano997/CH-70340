// Memory
import { ToyService as ToyServiceMemory } from "./memory/toy.service.js";
import { UserService as UserServiceMemory } from "./memory/user.service.js";

// MongoDB
import { ToyService as ToyServiceMongo } from "./mongodb/toy.service.js";
import { UserService as UserServiceMongo } from "./mongodb/user.service.js";

import { CONFIG } from "../config/config.js";
import { SERVICES } from "../common/enums/services.js";

function getService(service = "") {
  switch (service) {
    case SERVICES.MEMORY:
      return {
        toyService: new ToyServiceMemory(),
        userService: new UserServiceMemory(),
      };

    case SERVICES.MONGODB:
      return {
        toyService: new ToyServiceMongo(),
        userService: new UserServiceMongo(),
      };

    default:
      return {
        toyService: new ToyServiceMemory(),
        userService: new UserServiceMemory(),
      };
  }
}

export const { toyService, userService } = getService(CONFIG.PERSISTANCE);
