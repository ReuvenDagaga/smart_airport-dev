import { Request, Response } from "express";
import { ISoldier, SoldierModel } from "../models/Soldier";

export const registerSoldier = async (req: Request, res: Response) => {
    const newSoldierData: ISoldier = req.body;
    const { name } = newSoldierData;

    try {
        const soldierExist = await SoldierModel.findOne({ name });
        if (soldierExist) {
            res.status(401).json({ message: "Soldier already exist" });
            return
        }
        const newUser = new SoldierModel(newSoldierData);
        await newUser.save();
        res.status(201).json({ message: "Soldier registered successfully" });
        return
    } 
    catch (error) {
        res.status(400).json("Error registering user")
    }
}

 