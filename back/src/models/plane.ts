import mongoose, { Schema, Document } from 'mongoose';

export interface IPlane extends Document {
    type: string; 
    nickname: string; 
    isArmed: boolean; 
    isFueled: boolean; 
    wingStatus: boolean; 
    engineStatus: boolean; 
    wheelStatus: boolean; 
    locationStatus: 'controlTower' | 'hangar' | 'armory'| 'inAir'; 
}

const PlaneSchema: Schema = new Schema({
    type: { type: String, required: true }, 
    nickname: { type: String, required: true }, 
    isArmed: { type: Boolean, required: true }, 
    isFueled: { type: Boolean, required: true }, 
    wingStatus: {
        type: Boolean,
        required: true
    }, 
    engineStatus: {
        type: Boolean
     ,
        required: true
    }, 
    wheelStatus: {
        type: Boolean,
        required: true
    }, 
    locationStatus: {
        type: String,
        enum: ['controlTower', 'hangar', 'armory', 'inAir'],
        required: true
    } 
});


export const PlaneModel = mongoose.model<IPlane>('Plane', PlaneSchema);
