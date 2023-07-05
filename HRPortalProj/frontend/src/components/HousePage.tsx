import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import ReportList from './ReportList';
import axios from "axios";
import Navbar from './Navbar';

interface Resident{
    fullName: String,
    phoneNumber: String,
    email: String,
}

interface Comment{
    description:String,
    createBy:String,
    timeStamp:Date
}

interface Report{
    title:String,
    description:String,
    createBy: String,
    time: Date,
    status: String,
    comments: Array<Comment>
}

function HousePage(){

    let object = JSON.parse(localStorage.getItem("userInfo") as string)
    console.log(object.name)
    var user = object.name;
    
    const [refresh, setRefresh] = useState(0);
    const [address, setAddress] = useState();
    useEffect(() => {

        var url1 = "/house/findUser/"+user;
        axios.get(url1)
            .then(async res => {
                console.log(res.data[0]['currentAddress']);
                setAddress(res.data[0]['currentAddress']);
        });
    },[])
    console.log('address is ', address);

    const [house, setHouse] = useState({
        address:'',
        landlord:{
            fullName: '',
            phoneNumber: '',
            email: ''
        },
        facility: {
            bed:0,
            mattress: 0,
            table:0,
            chair: 0,
            report: []
        },
        employeeList: []});

    var rl: Array<Report> = [];
    const [content, setContent] = useState([<div></div>]);
    const [report, setReport] = useState({
        title:'',
        description:'',
        createBy: user,
        time: new Date(),
        status: 'Open',
        comments:[]
    });
    const [reportList, setReportList] = useState(rl);
    const [commentList, setCommentList] = useState({
        isShow: false,
        comments: ['default']
    })
    
    const [table, setTable] = useState([]);
    
    // get the house information by address
    async function residentInfo(){
        var url1 = "/house/findHouse/"+address
        axios.get(url1)
            .then(async res => {
                console.log(res.data)
                setHouse(res.data[0]);
                setReportList(res.data[0]['facility']['report'])
        });

        //console.log('house is ', house);
        var houseEmployeeList = house['employeeList'];
        //console.log('houseEmployeeList is ', houseEmployeeList);
        //console.log('reportList is ', reportList);
        var tableInfoT:any = []
        for (let i = 0; i < 2; i++){
            try{
                tableInfoT.push(
                <tr>
                    <td>{houseEmployeeList[i]['fullName']}</td>
                    <td>{houseEmployeeList[i]['email']}</td>
                </tr>)
            }catch{
                tableInfoT.push(
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>)
            }
        }
        //console.log(tableInfoT)
        setTable(tableInfoT);
    }
    
    const updateReport = (field:string) => (e:any) => {
        setReport((prevState:any) => ({ ...prevState, [field]: e.target.value }));
    };

    async function updateDatabase(){
        var createBy = user;
        var status = 'Open';
        //console.log('createBy',status)
        await setReport({
            title:report.title,
            description:report.description,
            createBy: user,
            time: new Date(),
            status: status,
            comments:[]
        });
        var temp:Array<Report> = reportList;
        console.log('CURRENT REPORT IS ', report);
        temp.push(report);
        setReportList(temp);
        //console.log('reportList is ', reportList);
        
        // update the report
        var houseUpdateInfo = {
            name:user,
            oldAddress: address,
            newReport: report,
        };
        axios.post("/house/update", houseUpdateInfo)
            .then(async res => {
        });
        setRefresh(refresh+1);
        
    }

    function commentSup(){
        if (commentList.isShow){
            setCommentList({
                isShow:false,
                comments:['default']
            });
        }else{
            setCommentList({
                isShow:true,
                comments:['default']
            });
            return [];
        }
        var reportComments = commentList.comments;
        var result = [];
        for (let comment of reportComments){
            //console.log('comment is', comment);
            result.push(
                <div>
                    <div>description: {comment}  </div>
                    <div>username: {user}</div>
                </div>
            )
        }
        //console.log('result is', result);
        return result;
    }

    function updateCommentView(){
        var tempContent = commentSup();
        console.log('check the content', tempContent.length);
        setContent(tempContent);
    }

    //{report.title} and {report.description}
    return(
        <div>
            <Navbar></Navbar>
            <div id='RoomInfo'>
                This is the roommate information area
                <div style={{marginBottom:'30px'}}>
                    <button onClick={residentInfo}> check roommate information (click twice)</button>
                    <table style={{margin:'auto'}}>
                
                    <tbody>
                        <tr>
                            <td>Resident Name</td>
                            <td>Resident Email</td>  
                        </tr>
                        {table.map((info)=>(
                            info
                        ))}
                    </tbody>
                </table></div>
                
            </div>

            <div id='ReportInfo'>
                This is report information area
                <div style={{marginBottom:'30px'}}>
                    Create a report here
                    <div>
                        <label>Title:</label>
                        <input value={report.title} type="text" onChange={updateReport('title')}></input>
                    </div>
                    <div>
                        <div><label>Description:</label></div>
                        <div><textarea value={report.description} onChange={updateReport('description')} placeholder='Please describe the issue!'></textarea></div>
                    </div>
                    
                    <button onClick={updateDatabase}> submit </button>
                    
                </div>
                
                <div style={{marginBottom:'30px'}}>
                    <button>Check the previous report</button>
                </div>
                
                <div style={{marginBottom:'30px'}}>
                    This part could allow user to do some modification
                    
                    {reportList.map((anObjectMapped, index) => {
                        return (
                            <ReportList user={user} report={anObjectMapped} address={address}/>
                        );
                    })}
                </div>
                
                
            </div>
        </div>
        
    )
    /**
     * <div>
                    This part is an option to allow user extend a list.
                    <button onClick={updateCommentView}>View the report list</button>
                    <div>{content}</div>
                </div>
     */

};

export default HousePage;
