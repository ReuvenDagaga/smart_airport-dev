import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';


export interface ISoldier extends Document {
    name: string; 
    password: string; 
    role: 'commander' | 'technician' | 'controller' | 'armorer'; 
    comparePassword(userPassword: string): Promise<boolean>;
}


const SoldierSchema: Schema = new Schema({
    name: { type: String, required: true ,unique: true}, 
    password: { 
        type: String, 
        required: true, 
    }, 
    role: { 
        type: String, 
        enum: ['commander', 'technician', 'controller', 'armorer'], 
        required: true 
    }, 
});

SoldierSchema.pre<ISoldier>("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  
  SoldierSchema.methods.comparePassword = async function (
    userPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(userPassword, this.password);
  };

export const SoldierModel = mongoose.model<ISoldier>('Soldier', SoldierSchema);

