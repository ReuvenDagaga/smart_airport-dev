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
exports.registerSoldier = void 0;
const Soldier_1 = require("../models/Soldier");
const registerSoldier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newSoldierData = req.body;
    const { name } = newSoldierData;
    try {
        const soldierExist = yield Soldier_1.SoldierModel.findOne({ name });
        if (soldierExist) {
            res.status(401).json({ message: "Soldier already exist" });
            return;
        }
        const newUser = new Soldier_1.SoldierModel(newSoldierData);
        yield newUser.save();
        res.status(201).json({ message: "Soldier registered successfully" });
        return;
    }
    catch (error) {
        res.status(400).json("Error registering user");
    }
});
exports.registerSoldier = registerSoldier;
