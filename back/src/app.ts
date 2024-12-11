import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./config/connectToDB";
import routerRegister from "./routes/registerRoute";
import routerMission from "./routes/missionRoutes" 
import routerAirplane from "./routes/airplaneRoutes"

dotenv.config()
const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 5000;

 connectToDB();

 app.use('/soldiers', routerRegister)
 app.use('/missions', routerMission);
 app.use('/planes', routerAirplane);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app