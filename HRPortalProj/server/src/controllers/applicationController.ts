import {connect, Schema, model} from 'mongoose';
import User from '../models/User';

export const updateApplicationApprove = async (request:any, response:any) =>{
    console.log('application approve');
    var requestInfo = request.body;
    var name = requestInfo.name;
    await User.updateOne({name:name}, {applicationStatus:'approved'})
    response.json({result:true});
};

export const updateApplicationReject = async (request:any, response:any) =>{
    console.log('application rejected');
    var requestInfo = request.body;
    var name = requestInfo.name;
    var feedback = requestInfo.feedback;
    await User.updateOne({name:name}, {applicationStatus:'rejected', applicationFeedback:feedback})
    response.json({result:true});
};