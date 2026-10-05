import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export const UserSchema = new mongoose.Schema<IUser>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
)

export const User = mongoose.model<IUser>("User", UserSchema)