import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import axios from "axios"
import Navbar from './Navbar';

// default application:
// email address, person’s name, registration link and status
// link should be a string encode to a jwt token


export default function HireManagePage(){
    const [isShow, setIsShow] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [showView, setShowView] = useState({
        pend:true,
        reject:false,
        approve:false
    });
    const [content, setContent] = useState({
        pend:[],
        reject:[],
        approve:[]
    })

    var feedbackConstant = 'test';

    function testing(data:string){
        setFeedback(data);
    }

    const updateFeedback = (e:any) => {
        // the problem here if the hr type the comment at the same time
        console.log('e.target.value', e.target.value);
        var test = e.target.value;
        console.log('test', test);
        feedbackConstant = test;
    }
    
    const rejectAndComment = (e:any) => {
        // move the application to rejected and update the database comment ;
        console.log('feedback in reject function is', feedback);
        for (let i = 0; i < applicationList.length; i++){
            var application = applicationList[i];
            if (application.name == e.target.name){
                applicationList[i]['status'] = 'rejected';
                applicationList[i]['applicationFeedback'] = feedbackConstant;
                
                axios.post("/user/applicationReject", {
                        name:application.name,
                        feedback:application.applicationFeedback
                    }).then(async res => {
                    // console.log(res.data);
                    if (res.data.result){
                        console.log('reject request finished');
                    }
                });
                break;
            }
        }
        rebuild();
    }

    const approveAndUpdate = (e:any) => {
        for (let i = 0; i < applicationList.length; i++){
            var application = applicationList[i];
            if (application.name == e.target.value){
                applicationList[i]['status'] = 'approved';

                axios.post("/user/applicationApprove", {name:application.name})
                    .then(async res => {
                    // console.log(res.data);
                    if (res.data.result){
                        console.log('approve request finished');
                    }
                });
                break;
            }
        }
        rebuild();
    }

    var userFormat:Array<any> = [];
    const [allUser, setAllUser] = useState(userFormat);
    const [applicationList, setApplicationList] = useState(userFormat);
    const [registerList, setRegisterList] = useState(userFormat);
    function loadData(){
        axios.get("/house/findAllUser")
            .then(async res => {
            // console.log(res.data);
            setAllUser(res.data);
        });

        console.log('all user data', allUser);
        setApplicationList([]);
        var temp = []
        for (let user of allUser){
            var application = {
                name: user.name,
                email: user.email,
                link: user.token,
                status: user.applicationStatus,
                applicationFeedback: user.applicationFeedback?user.applicationFeedback:''
            }
            temp.push(application);
        }
        setApplicationList(temp);

        axios.get("/user/getAllApplication")
        .then(async res => {
            console.log(res.data);
            var registers = res.data;
            var rlist = []
            for (let register of registers){
                var t = {
                    name: register.name,
                    email: register.email,
                    link: register.link,
                    status:register.status
                }
                rlist.push(t);
            }
            setRegisterList(rlist);
        });

    }
    
    function rebuild(){
        setContent({
            pend:[],
            reject:[],
            approve:[]
        });
        if (allUser){
            var pendingApplication:any = [];
            var rejectApplication:any = [];
            var approveApplication:any = [];
            for (let application of applicationList){
                
                var linkUrl = "http://localhost:3000/applicationForm?user="+application.name;
                if (application.status == 'pending'){
                    pendingApplication.push(
                        <div>
                            <div>{application.name} - {application.email}</div>
                            <div>Link: <a href={linkUrl} target="_blank" rel="noopener noreferrer">application form</a></div>
                            <button value={application.name} onClick={approveAndUpdate}>Approve</button>
                            <button name={application.name} onClick={rejectAndComment}>Reject</button>
                            <div><textarea onChange={updateFeedback} placeholder='type the reason for rejected'/>
                            </div>
                        </div>
                    );
                }
                if (application.status == "rejected"){
                    rejectApplication.push(
                        <div>
                            <div>{application.name} - {application.email}</div>
                            <div>Link: <a href={linkUrl} target="_blank" rel="noopener noreferrer">application form</a></div>
                            <div>Feedback: {application.applicationFeedback}</div>
                        </div>
                    );
                }
                if (application.status == "approved"){
                    approveApplication.push(
                        <div>
                            <div>{application.name} - {application.email}</div>
                            <div>Link: <a href={linkUrl} target="_blank" rel="noopener noreferrer">application form</a></div>
                        </div>
                    );
                }
            }
            console.log('pend is', pendingApplication);
            console.log('rejectApplication is', rejectApplication);
            console.log('approveApplication is', approveApplication);
            setContent({
                pend:pendingApplication,
                reject:rejectApplication,
                approve:approveApplication
            });
            console.log('content',content);
            console.log('applicationList', applicationList);
        }
    }

    function choicePend(){
        setShowView(
            {
                pend:true,
                reject:false,
                approve:false
            }
        );
    }

    function choiceReject(){
        setShowView(
            {
                pend:false,
                reject:true,
                approve:false
            }
        );
    }

    function choiceApprove(){
        setShowView(
            {
                pend:false,
                reject:false,
                approve:true
            }
        );
    }
    
    const manageButton = <div>
        <button onClick={choicePend} style={{margin:'1px'}}>Pending</button>
        <button onClick={choiceReject} style={{margin:'1px'}}>Rejected</button>
        <button onClick={choiceApprove} style={{margin:'1px'}}>Approved</button>
        {showView.pend? content.pend.map((element) => element):null}
        {showView.reject? content.reject.map((element) => element):null}
        {showView.approve? content.approve.map((element) => element):null}
    </div>

    function changeShowState(){
        if (isShow){
            setIsShow(false);
        }else{
            setIsShow(true);
        }
        rebuild();
    }

    // Emailfunction

    const { register, handleSubmit, watch, setValue, formState: { errors }, control } = useForm({
        defaultValues: {

            email: ""
        }
    })

    const onSubmit = async (data: any) => {
        console.log(data)
        axios.post("/user/hr/sendEmail", data)
            .then((res) => { console.log(res.data) })
    }
    
    // store the new register information
    var rlFormat:Array<any> = [];
    
    function sendAndStore(){
        var registerInfo = candidateInfo;
        console.log(candidateInfo)
        axios.post("/user/hr/sendEmail", candidateInfo)
        .then( async res=>{
            var existedRegister:Array<any> = registerList;
            registerInfo['link'] = res.data.message;
            
            existedRegister.push(registerInfo);
            setRegisterList(existedRegister);
        }


        )

    }
    // get the register information
    const [candidateInfo, setCandidateInfo] = useState({
        name: '',
        email: '',
        link: "https://localhost:3000/register",
        status:'not submited'
    });
    const registerInfoUpdate = (field:any) => (e:any) => {
        setCandidateInfo((prevState) => ({ ...prevState, [field]: e.target.value }));
    }

    //display the register information
    const [isShowHistory, setIsShowHistory] = useState(false);
    const HistoryContent =()=>(
        <div>
            {registerList.map((registerInformation, index)=>{
                return(
                    <div style={{border: '1px solid black',borderRadius: '5px!important',margin:'1px'}}>
                        <div>Name: {registerInformation.name}</div>
                        <div>Email: {registerInformation.email}</div>
                        <div>Link: {registerInformation.link}</div>
                        <div>Status: {registerInformation.status}</div>
                    </div>
                )
            })}
        </div>
    )
    function showHistory(){
        if (isShowHistory){
            setIsShowHistory(false);
        }else{
            setIsShowHistory(true);
        }
    }


    /**
     * <button onClick={changeShowState}>View application</button>
            {isShow? <div>{manageButton}</div>: null}
     */
    
    return (
        <>
        
        <Navbar></Navbar>
        <div>
            <div>
                <div>
                    <label>Candidate Email:</label>
                    <input type="text" placeholder='type the name' onChange={registerInfoUpdate('name')}></input>
                    <input type="text" placeholder='type the email' onChange={registerInfoUpdate('email')}></input>
                    <button onClick={sendAndStore}>Send the register link</button>
                    <div><button onClick={showHistory}>View History ({registerList.length})</button></div>
                    <div>{isShowHistory?<div><HistoryContent/></div>:null}</div>
                </div>
            </div>
            <br></br>
            <button onClick={changeShowState}>View application</button>
            {isShow? <div>{manageButton}</div>: null}
            <div style={{margin:'1px'}}>
                <button onClick={loadData}>load all user (click twice)</button>
            </div>

        </div>
        </>
    );
}