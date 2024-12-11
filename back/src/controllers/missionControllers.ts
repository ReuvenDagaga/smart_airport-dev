import { Request, Response } from "express";
import { MissionModel } from '../models/mission';
import { PlaneModel } from '../models/plane';


//יצירת מסימה לתקיפה
export const createMission = async (req: Request, res: Response) => {
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

    
        const newMission = new MissionModel({
            description,
            priority,
            requiredPlanes,
            status: 'pending', 
        });

        await newMission.save();

       
        res.status(201).json({ message: 'Mission created successfully', mission: newMission });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }


}

//קבלת כל המסימות
export const getMissions = async (req: Request, res: Response) => {
    try {
        const missions = await MissionModel.find();
        res.status(200).json({ missions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//אין עדיין נתיב ביצוע משימה
export const executeMission = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const mission = await MissionModel.findById(id);
        if (!mission) {
            res.status(404).json({ message: 'Mission not found' });
            return;
        }
        if (mission.status !== 'pending') {
            res.status(400).json({ message: 'Mission is already in progress or completed' });
            return;
        }
        const availablePlanes = await PlaneModel.find({ locationStatus: 'controlTower', isFueled: true, isArmed: true })
            .limit(mission.requiredPlanes);
        if (availablePlanes.length < mission.requiredPlanes) {
            res.status(400).json({ message: 'Not enough planes available for this mission' });
            return;
        }
        for (const plane of availablePlanes) {
            plane.locationStatus = 'inAir';
            plane.isFueled = false; 
            plane.isArmed = false; 
            await plane.save();
        }

        mission.status = 'completed';
        await mission.save();
        res.status(200).json({ message: 'Mission is now in progress', mission });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// עדכון סטטוס משימה
export const updateMissionStatus = async (req: Request, res: Response): Promise<void> => {
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
        const mission = await MissionModel.findById(id);
        if (!mission) {
            res.status(404).json({ message: 'Mission not found' });
            return;
        }
        mission.status = status; 
        await mission.save(); 

        res.status(200).json({ message: 'Mission status updated successfully', mission });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};