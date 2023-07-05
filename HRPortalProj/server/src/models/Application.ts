import { Schema, Model, model, connect, Types } from 'mongoose';
import mongoose from "mongoose";

const ApplicationSchema = new Schema({
    name: String,
    email: String,
    link: String,
    status: String
});
const Application = mongoose.model("Application", ApplicationSchema);

export default Application;