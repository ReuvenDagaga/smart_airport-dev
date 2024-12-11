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
exports.updateMissionStatus = exports.executeMission = exports.getMissions = exports.createMission = void 0;
const mission_1 = require("../models/mission");
const plane_1 = require("../models/plane");
//יצירת מסימה לתקיפה
const createMission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, priority, requiredPlanes } = req.body;
        if (!description || !priority || !requiredPlanes) {
            res.status(400).json({ message: 'All fields are required: description, priority, and requiredPlanes' });
            return;
        }
        if (![1, 2, 3].includes(priority)) {
            res.status(400).json({ message: 'Priority must be 1, 2, or 3' });
            return;
        }
        const newMission = new mission_1.MissionModel({
            description,
            priority,
            requiredPlanes,
            status: 'pending',
        });
        yield newMission.save();
        res.status(201).json({ message: 'Mission created successfully', mission: newMission });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createMission = createMission;
//קבלת כל המסימות
const getMissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const missions = yield mission_1.MissionModel.find();
        res.status(200).json({ missions });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getMissions = getMissions;
//אין עדיין נתיב ביצוע משימה
const executeMission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const mission = yield mission_1.MissionModel.findById(id);
        if (!mission) {
            res.status(404).json({ message: 'Mission not found' });
            return;
        }
        if (mission.status !== 'pending') {
            res.status(400).json({ message: 'Mission is already in progress or completed' });
            return;
        }
        const availablePlanes = yield plane_1.PlaneModel.find({ locationStatus: 'controlTower', isFueled: true, isArmed: true })
            .limit(mission.requiredPlanes);
        if (availablePlanes.length < mission.requiredPlanes) {
            res.status(400).json({ message: 'Not enough planes available for this mission' });
            return;
        }
        for (const plane of availablePlanes) {
            plane.locationStatus = 'inAir';
            plane.isFueled = false;
            plane.isArmed = false;
            yield plane.save();
        }
        mission.status = 'completed';
        yield mission.save();
        res.status(200).json({ message: 'Mission is now in progress', mission });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.executeMission = executeMission;
// עדכון סטטוס משימה
const updateMissionStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!status) {
            res.status(400).json({ message: 'Status is required' });
            return;
        }
        // בדיקת ערכי סטטוס תקינים
        const validStatuses = ['pending', 'completed'];
        if (!validStatuses.includes(status)) {
            res.status(400).json({ message: `Invalid status. Valid statuses are: ${validStatuses.join(', ')}` });
            return;
        }
        // חיפוש המשימה ועדכונה
        const mission = yield mission_1.MissionModel.findById(id);
        if (!mission) {
            res.status(404).json({ message: 'Mission not found' });
            return;
        }
        mission.status = status;
        yield mission.save();
        res.status(200).json({ message: 'Mission status updated successfully', mission });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateMissionStatus = updateMissionStatus;
