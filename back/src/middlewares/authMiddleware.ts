import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: { id: string; role: string };
};

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    console.log(token);
    
    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            id: string;
            role: string;
        };
        console.log(decoded);
        
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        
        res.status(401).json({ message: "Invalid token" });
    }
};

export const isCommanderMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    if (req.user?.role !== "commander") {
        res.status(403).json({ message: "You are not authorized to perform this action" });
        console.log("You are not authorized to perform this action");
        
    }
    else {
        next();
    }
};