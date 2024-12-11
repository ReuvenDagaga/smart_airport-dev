import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { SoldierModel } from '../models/Soldier';
const JWT_SECRET = process.env.JWT_SECRET || 'my_secret';

export const login = async (req: Request, res: Response ) => {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
             res.status(400).json({ message: 'Name and password are required' });
        }
        const soldier = await SoldierModel.findOne({ name }).select('-password');
        if (!soldier) {
             res.status(404).json({ message: 'Soldier not found' });
             return
        }
        if (!soldier.comparePassword)  {
             res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign(
            { id: soldier._id, role: soldier.role },
            JWT_SECRET,
            { expiresIn: '1h' } 
        );
        res.status(200).json({ token, role: soldier.role, soldier: soldier });
        return
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
