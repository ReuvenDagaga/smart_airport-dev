"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPlane = exports.updatePlaneLocation = exports.getPlanesByLocation = exports.getPlanes = void 0;
const plane_1 = require("../models/plane");
// קבלת כל המטוסים
const getPlanes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const planes = yield plane_1.PlaneModel.find({});
        res.status(200).json(planes);
    }
    catch (error) {
        res.status(400).json("Error getting planes");
    }
});
exports.getPlanes = getPlanes;
//  קבלת כל המטוסים לפי מיקום
const getPlanesByLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const location = req.params.location;
    try {
        const planes = yield plane_1.PlaneModel.find({ locationStatus: location });
        if (planes.length === 0) {
            res.status(404).json({ message: "No planes found" });
            return;
        }
        res.status(200).json(planes);
        return;
    }
    catch (error) {
        res.status(400).json("Error getting planes");
    }
});
exports.getPlanesByLocation = getPlanesByLocation;
// עידכון  מטוס
const updatePlaneLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const planeId = req.params.id;
    const newPlAne = req.body;
    try {
        const existPlane = yield plane_1.PlaneModel.findById(planeId);
        if (!existPlane) {
            res.status(404).json({ message: "Plane not found" });
            return;
        }
        yield plane_1.PlaneModel.findByIdAndUpdate(planeId, newPlAne);
        res.status(200).json({ message: "Plane updated successfully", plane: newPlAne });
        return;
    }
    catch (error) {
        res.status(400).json("Error updating plane");
    }
});
exports.updatePlaneLocation = updatePlaneLocation;
const addPlane = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newAirplaneData = req.body;
    try {
        const newAirplane = new plane_1.PlaneModel(newAirplaneData);
        yield newAirplane.save();
        res.status(201).json({ message: "Plane added successfully" });
        return;
    }
    catch (error) {
        res.status(400).json("Error adding plane");
    }
});
exports.addPlane = addPlane;
//example of request body:
// {
//     "type": "F-16",
//     "nickname": "Hawk",
//     "isArmed": true,
//     "isFueled": true,
//     "wingStatus": "operational",
//     "engineStatus": "operational",
//     "wheelStatus": "operational",
//     "locationStatus": "controlTower"
// }
