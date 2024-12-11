"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const airplaneControllers_1 = require("../controllers/airplaneControllers");
const router = (0, express_1.Router)();
router.get('/planes', airplaneControllers_1.getPlanes);
router.get('/planes/:location', airplaneControllers_1.getPlanesByLocation);
router.put('/planes/:id', airplaneControllers_1.updatePlaneLocation);
router.post('/planes', airplaneControllers_1.addPlane);
exports.default = router;
