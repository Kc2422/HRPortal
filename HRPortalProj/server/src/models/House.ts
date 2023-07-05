import { Schema, Model, model, connect, Types } from 'mongoose';
// set not required attribute !
import mongoose from "mongoose"
interface IHouse{
    address:string,
    landlord: Landlord,
    facility: Facility,
    employeeList: Resident[]
}

interface Facility{
    bed:number,
    mattress: number,
    table:number,
    chair: number,
    report: Report[],
}

interface Report{
    time: Date,
    title: string,
    description: string,
    status: string,
    comment: Comment
}

interface Comment{
    description: string,
    time: Date,
    status:string
}

interface Landlord{
    fullName: string,
    phoneNumber: string,
    email: string
}

interface Resident{
    fullName: String,
    phoneNumber: String,
    email: String,
}

const HouseSchema = new Schema<IHouse>({
    address: String,
    landlord: {
        fullName: String,
        phoneNumber: String,
        email: String
    },
    facility: {
        bed:Number,
        mattress: Number,
        table:Number,
        chair: Number,
        report: [{
            time: Date,
            title: String,
            description: String,
            status: String,
            comment: {description: String,
                time: Date,
                status:String}
        }]
    },
    employeeList: [{
        fullName: String,
        phoneNumber: String,
        email: String,
    }]
});

const House = mongoose.model<IHouse>("House", HouseSchema)

export default House;