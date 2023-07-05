import { useLocation } from "react-router-dom";
import {useState} from 'react';
import CommentComponent from './CommentComponent';

interface Comment{
    description:String,
    createBy:String,
    timeStamp:Date
}

export default function ReportComponent(props:any){
    const [reportInfo, setReportInfo] = useState(props.house);
    const [content, setContent] = useState();
    // user here better be email, because email is a primary key
    var user = props.user;
    var address = props.address;
    var report = props.report;
    var title = report.title;
    var description = report.description;
    var createBy = report.createBy;
    var status = report.status;
    var time = report.time?report.time:'unknown';
    var comments = report.comment;
    console.log('data is', status);
    
    //var commentList = props.house.facility.report.comment;
    console.log('props is', props);
    /*console.log('report is', report);
    console.log('user is', user);
    *
     * <div>Title: {reportInfo.title}</div>
            <div>Description: {reportInfo.description}</div>
            <div>CreateBy: {reportInfo.createBy}</div>
            <div>TimeStamp: {reportInfo.timeStamp}</div>
            <div>Status: {reportInfo.status}</div>
            <div>Comments: 
                <CommentComponent user={user} report={report} commentList={commentList}/>
            </div>
            key={reportInfo.timeStamp}
            {anObjectMapped.title} - {anObjectMapped.description} - {user}
                                <button onClick={updateCommentView}>View comment List</button>
                                {(content.map((element)=>element))}
     */

    return (
        <div  style={{border: '2px solid black',borderRadius: '5px!important',margin:'1px'}}>
            <div>Title: {title}</div>
            <div>Description: {description}</div>
            <div>CreateBy: {createBy}</div>
            <div>TimeStamp: {time.toString()}</div>
            <div>Status: {status}</div>
            <CommentComponent comments={comments} user={user} 
            address={address} report={report}/>
        </div>
    )

}