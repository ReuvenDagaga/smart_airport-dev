import { Request, Response } from "express";
import { IPlane, PlaneModel } from "../models/plane";

// קבלת כל המטוסים
export const getPlanes = async (req: Request, res: Response) => {
    try {
        const planes = await PlaneModel.find({});
        res.status(200).json(planes);
    } catch (error) {
        res.status(400).json("Error getting planes")
    }
}

//  קבלת כל המטוסים לפי מיקום
export const getPlanesByLocation = async (req: Request, res: Response) => {
    const location = req.params.location;

    try {
        const planes = await PlaneModel.find({ locationStatus: location });

        if (planes.length === 0) {
            res.status(404).json({ message: "No planes found" });
            return
        }
        res.status(200).json(planes);
        return
    } catch (error) {
        res.status(400).json("Error getting planes")
    }
}

// עידכון  מטוס
export const updatePlaneLocation = async (req: Request, res: Response) => {
    const planeId = req.params.id;
    const newPlAne = req.body;

    try {
        const existPlane = await PlaneModel.findById(planeId);
        if (!existPlane) {
            res.status(404).json({ message: "Plane not found" });
            return
        }
        await PlaneModel.findByIdAndUpdate(planeId, newPlAne);
        res.status(200).json({ message: "Plane updated successfully", plane: newPlAne });
        return
    } catch (error) {
        res.status(400).json("Error updating plane")
    }
}

export const addPlane = async (req: Request, res: Response) => {
    const newAirplaneData: IPlane = req.body;
    try {
        const newAirplane = new PlaneModel(newAirplaneData);
        await newAirplane.save();
        res.status(201).json({ message: "Plane added successfully" });
        return
    } catch (error) {
        res.status(400).json("Error adding plane")
    }
}
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

