import { Router } from "express";
import { getPlanes, getPlanesByLocation, updatePlaneLocation, addPlane}  from "../controllers/airplaneControllers";
import { get } from "mongoose";

const router = Router();

router.get('/planes', getPlanes);
router.get('/planes/:location', getPlanesByLocation);
router.put('/planes/:id', updatePlaneLocation);
router.post('/planes', addPlane);

export default router;