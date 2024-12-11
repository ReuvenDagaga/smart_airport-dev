import { Router } from "express";
import { createMission, getMissions,executeMission,updateMissionStatus } from "../controllers/missionControllers";

const router = Router();

router.post('/mission', createMission);
router.get('/missions', getMissions);
router.post('/executeMission/:id',executeMission );
router.put('/updateMissionStatus/:id', updateMissionStatus);
export default router;