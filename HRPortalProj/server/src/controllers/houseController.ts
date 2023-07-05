import {connect, Schema, model} from 'mongoose';
import User from '../models/User';
import House from '../models/House';


// const userModel = model('User', UserSchema);
//const houseModel = model('house', HouseSchema);

// assume that login do not have address information
// then we have to search it through the database.
// user/house/:user
// user/house/update => comment, address

export const createHouse = async (request:any, response:any) =>{
    var houseInfo = request.body;
    var createInfo = await House.create(houseInfo);
    response.json({result:'success'});
};

export const findUserInfo = async (request:any, response:any) =>{
    var userName = request.params.user;
    var userInfo = await User.find({name:userName});
    response.json(userInfo);
};

export const findAllUserInfo = async (request:any, response:any) =>{
    var userInfo = await User.find({});
    response.json(userInfo);
};

export const findUHouseInfo = async (request:any, response:any) =>{
    var address = request.params.address;
    var houseInfo = await House.find({address:address});
    //console.log('at address',request.params);
    //console.log('found house', houseInfo);
    response.json(houseInfo);
};

export const findAllHouseInfo = async (request:any, response:any) =>{
    //console.log('reach here');
    var houseInfo = await House.find({});
    //console.log('findAllHouseInfo',houseInfo);
    response.json(houseInfo);
};

export const houseUpdate = async (request:any, response:any) =>{
    var requestInfo = request.body;
    var userName = requestInfo.name;
    var oldAddress = requestInfo.oldAddress;
    var newAddress = requestInfo.newAddress;
    var residentInfo = requestInfo.residentInfo;
    var reportInfo = requestInfo.reportInfo;// used to locate the comment
    var newReport = requestInfo.newReport;
    var commentList = requestInfo.commentList;
    var description = requestInfo.description;
    //need update report, address, description
    if (newAddress){
        //find old address and remove
        console.log('changing address');
        
        var houseInfo = await House.findOne({address:oldAddress});
        if (houseInfo){
            var residentList = houseInfo.employeeList;
            var counter = 0;
            for (let resident of residentList){
                if (resident.fullName == residentInfo.fullName){
                    residentList.splice(counter, 1);
                }
                counter += 1;
            }
            await House.updateOne({address:oldAddress}, {employeeList: residentList});
        }
        //find new address and update
        houseInfo = await House.findOne({address:newAddress});
        if (houseInfo){
            var residentList = houseInfo.employeeList;
            residentList.push(residentInfo);
            await House.updateOne({address:oldAddress}, {employeeList: residentList});
        }
    }

    if (commentList) {
        // update the report information
        console.log('adding a new comment', commentList);
        var houseInfo = await House.findOne({address:oldAddress});
        if (houseInfo){
            var reportList = houseInfo.facility.report;
            for(let i = 0; i < reportList.length; i++){
                var jsonReport = JSON.stringify(reportList[i]);
                var jsonReportInfo = JSON.stringify(reportInfo);
                //reportList[0].time.getTime() == reportInfo.time.getTime(),
                var test1 = new Date(reportInfo.time);
                var test2 = reportList[i].time;
                console.log(test1, test2);
                console.log('trigger update', test1.getTime() == test2.getTime());
                if (test1.getTime() == test2.getTime()){
                    reportList[i].comment = commentList;
                    break;
                }
            }
            houseInfo.facility.report = reportList;
            console.log('updated houseInfo', houseInfo.facility.report);
            var testObject = await House.updateOne({address:oldAddress}, {facility: houseInfo.facility});
            //console.log('testObject', testObject);
        }
    }

    if (newReport) {
        console.log('adding a new report', userName, newReport);
        var houseInfo = await House.findOne({address:oldAddress});
        if (houseInfo){
            var reportList = houseInfo.facility.report; 
            reportList.push(newReport);
            houseInfo.facility.report = reportList;
            //console.log('updated houseInfo.facility.report', houseInfo.facility.report);
            await House.updateOne({address:oldAddress}, {facility: houseInfo.facility});
        }
    }

    if (description) {
        // update the description
        console.log('updating the new description')
        var houseInfo = await House.findOne({address:oldAddress});
        
        if (houseInfo){
            var rlist = houseInfo.facility.report;
            var title = reportInfo.title;
            for (let i = 0; i < rlist.length; i++){
                if (rlist[i].title == title){
                    rlist[i].description = description;
                    break;
                }
            }
            houseInfo.facility.report = rlist;
            await House.updateOne({address:oldAddress}, {facility: houseInfo.facility});
        }
        
    }
    response.json({result:'success'});
}