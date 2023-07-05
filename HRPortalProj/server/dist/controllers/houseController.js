"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.houseUpdate = exports.findUHouseInfo = exports.findUserInfo = void 0;
const User_1 = __importDefault(require("../models/User"));
const House_1 = __importDefault(require("../models/House"));
// const userModel = model('User', UserSchema);
//const houseModel = model('house', HouseSchema);
// assume that login do not have address information
// then we have to search it through the database.
// user/house/:user
// user/house/update => comment, address
const findUserInfo = (request, response) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var name = request.params.user;
    var userInfo = yield User_1.default.find({ name: name });
    response.json(userInfo);
  });
exports.findUserInfo = findUserInfo;
const findUHouseInfo = (request, response) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var address = request.params.address;
    var houseInfo = yield House_1.default.find({ address: address });
    //console.log('at address',request.params);
    //console.log('found house', houseInfo);
    response.json(houseInfo);
  });
exports.findUHouseInfo = findUHouseInfo;
const houseUpdate = (request, response) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var requestInfo = request.body;
    var name = requestInfo.name;
    var oldAddress = requestInfo.oldAddress;
    var newAddress = requestInfo.newAddress;
    var residentInfo = requestInfo.residentInfo;
    var reportInfo = requestInfo.reportInfo; // used to locate the comment
    var newReport = requestInfo.newReport;
    var commentList = requestInfo.commentList;
    var description = requestInfo.description;
    //need update report, address, description
    if (newAddress) {
      //find old address and remove
      console.log("changing address");
      var houseInfo = yield House_1.default.findOne({ address: oldAddress });
      if (houseInfo) {
        var residentList = houseInfo.employeeList;
        var counter = 0;
        for (let resident of residentList) {
          if (resident.fullName == residentInfo.fullName) {
            residentList.splice(counter, 1);
          }
          counter += 1;
        }
        yield House_1.default.updateOne(
          { address: oldAddress },
          { employeeList: residentList }
        );
      }
      //find new address and update
      houseInfo = yield House_1.default.findOne({ address: newAddress });
      if (houseInfo) {
        var residentList = houseInfo.employeeList;
        residentList.push(residentInfo);
        yield House_1.default.updateOne(
          { address: oldAddress },
          { employeeList: residentList }
        );
      }
    }
    if (commentList) {
      // update the report information
      console.log("adding a new comment", commentList);
      var houseInfo = yield House_1.default.findOne({ address: oldAddress });
      if (houseInfo) {
        var reportList = houseInfo.facility.report;
        for (let i = 0; i < reportList.length; i++) {
          var jsonReport = JSON.stringify(reportList[i]);
          var jsonReportInfo = JSON.stringify(reportInfo);
          //reportList[0].time.getTime() == reportInfo.time.getTime(),
          var test1 = new Date(reportInfo.time);
          var test2 = reportList[i].time;
          if (test1.getTime() == test2.getTime()) {
            //console.log('trigger update', reportList[i].time == reportInfo.time);
            reportList[i].comment = commentList;
          }
        }
        houseInfo.facility.report = reportList;
        console.log("updated houseInfo", houseInfo.facility.report);
        var testObject = yield House_1.default.updateOne(
          { address: oldAddress },
          { facility: houseInfo.facility }
        );
        //console.log('testObject', testObject);
      }
    }
    if (newReport) {
      console.log("adding a new report");
      var houseInfo = yield House_1.default.findOne({ address: oldAddress });
      if (houseInfo) {
        var reportList = houseInfo.facility.report;
        reportList.push(newReport);
        houseInfo.facility.report = reportList;
        yield House_1.default.updateOne(
          { address: oldAddress },
          { facility: houseInfo.facility }
        );
      }
    }
    if (description) {
      // update the description
      console.log("updating the new description");
      var houseInfo = yield House_1.default.findOne({ address: oldAddress });
      if (houseInfo) {
        var rlist = houseInfo.facility.report;
        var title = reportInfo.title;
        for (let i = 0; i < rlist.length; i++) {
          if (rlist[i].title == title) {
            rlist[i].description = description;
            break;
          }
        }
        houseInfo.facility.report = rlist;
        yield House_1.default.updateOne(
          { address: oldAddress },
          { facility: houseInfo.facility }
        );
      }
    }
  });
exports.houseUpdate = houseUpdate;
