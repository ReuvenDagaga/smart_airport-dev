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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Soldier_1 = require("../models/Soldier");
const JWT_SECRET = process.env.JWT_SECRET || 'my_secret';
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            res.status(400).json({ message: 'Name and password are required' });
        }
        const soldier = yield Soldier_1.SoldierModel.findOne({ name }).select('-password');
        if (!soldier) {
            res.status(404).json({ message: 'Soldier not found' });
            return;
        }
        if (!soldier.comparePassword) {
            res.status(401).json({ message: 'Invalid password' });
        }
        const token = jsonwebtoken_1.default.sign({ id: soldier._id, role: soldier.role }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, role: soldier.role, soldier: soldier });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.login = login;
