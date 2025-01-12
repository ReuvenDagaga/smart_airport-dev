"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registerController_1 = require("../controllers/registerController");
const loginController_1 = require("../controllers/loginController");
const router = (0, express_1.Router)();
router.post('/register', registerController_1.registerSoldier);
router.post('/login', loginController_1.login);
exports.default = router;
