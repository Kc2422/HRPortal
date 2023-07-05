import { Schema, Model, model, connect, Types } from "mongoose";
import mongoose from "mongoose";

export interface IRegToken {
    email: String,
    expiration: Date
}

const RegTokenSchema = new Schema<IRegToken>({
    email: String,
    expiration: Date
},{timestamps: true})

const RegToken = mongoose.model<IRegToken>("RegToken", RegTokenSchema)
export default RegToken