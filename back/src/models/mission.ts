import mongoose, { Schema, Document } from 'mongoose';

export interface IMission extends Document {
    description: string; 
    priority: 1 | 2 | 3; 
    requiredPlanes: number; 
    status: 'pending' |  'completed'; 
}


const MissionSchema: Schema = new Schema({
    description: { type: String, required: true }, 
    priority: { type: Number, enum: [1, 2, 3], required: true }, 
    requiredPlanes: { type: Number, required: true }, 
    status: {
        type: String,
        enum: ['pending', 'completed'],
        required: true
    } 
});

export const MissionModel = mongoose.model<IMission>('Mission', MissionSchema);
