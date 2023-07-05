import React, {useState, useEffect} from 'react';
import Resident from './ResidentComponent';
import ReportList from './ReportList';
import axios from "axios";
import {useLocation} from 'react-router-dom';
import Navbar from './Navbar';

const fakeHouseData = {
    address: "unit 1",
    landlord: {
        fullName: 'landlord',
        phoneNumber: '1111111111',
        email: 'e@e.com'
    },
    facility: {
        bed:2,
        mattress: 2,
        table:2,
        chair: 2,
        report: [
            {time: '10/26-15:19',
            title: 'title 1',
            description: 'description 1',
            status: 'closed',
            comment: [{
                description:"message from employee",
                createBy:"emaplyee1",
                time: '10/26-15:21'
            },{
                description:"message from hr",
                createBy:"hr",
                time: '10/26-15:22'
            }]},
            {time: '10/26-15:29',
            title: 'title 2',
            description: 'description 2',
            status: 'in process',
            comment: [{
                description:"message from employee",
                createBy:"emaplyee1",
                time: '10/26-15:31'
            },{
                description:"message from hr",
                createBy:"hr",
                time: '10/26-15:32'
            }]},
            {time: '10/26-15:40',
            title: 'title 3',
            description: 'description 3',
            status: 'in process',
            comment: [{
                description:"message from employee",
                createBy:"emaplyee1",
                time: '10/26-15:41'
            },{
                description:"message from hr",
                createBy:"hr",
                time: '10/26-15:42'
            }]}
        ]
    },
    employeeList: [
        {fullName: 'employee1',
        phoneNumber: '2222222222',
        email: 'e1@e.com'},
        {fullName: 'employee2',
        phoneNumber: '3333333333',
        email: 'e2@e.com'}
    ]
}

interface Resident{
    fullName: String,
    phoneNumber: String,
    email: String,
}

var fakeDataList: Array<any> = [];
for (let i = 1; i < 3; i++){
    let unitName = 'unit' + i;
    var temp:any = new Object(fakeHouseData);
    temp['address'] = unitName;
    fakeDataList.push(temp);
}

var EmployeeComponent = (eList:Array<Resident>) =>(
    <div>
    </div>
)

export default function HouseManagePage(){
    const [isShow, setIsShow] = useState(false);
    const [houses, setHouses] = useState(fakeDataList);
    const [showHouseInfo, setShowHouseInfo] = useState(false);
    function showHouseDetail(){
        if (showHouseInfo){
            setShowHouseInfo(false);
        }else{
            setShowHouseInfo(true);
        }
        loadData();
    }

    useEffect(()=>{
        axios.get("/house/findAllHouse")
            .then(async res => {
            setHouses(res.data);
        });
    },[]);


    let object = JSON.parse(localStorage.getItem("userInfo") as string)
    console.log(object.name)
    var user = object.name;
    // <ReportList user={user} report={record} address={house.address}/>
    const HousePlacement = () => (
        <div>
            {houses.map((house, index) => {
                var keyName = house.address + index;
                return (
                    <div key={keyName}  style={{border: '1px solid black',borderRadius: '5px!important', margin:'1px'}}>
                        <br/>
                        <div>Address: {house.address}</div>
                        <div>Landlord: {house.landlord.fullName}
                            Contact: {house.landlord.phoneNumber}
                            Email: {house.landlord.email}
                        </div>
                        <div>Availability: {house.employeeList.length}/2</div>
                        <div>
                            <button onClick={showHouseDetail}>Show house info</button>
                            {showHouseInfo?<div> House Information: 
                                <div>Bed: {house.facility.bed}</div>
                                <div>mattress: {house.facility.mattress}</div>
                                <div>table: {house.facility.table}</div>
                                <div>chair: {house.facility.chair}</div></div>:null}
                        </div>
                        
                        <div><b>Report information:</b> {house.facility.report.length}</div>
                        <div>{house.facility.report.map((anObjectMapped:any, index:any) => {
                            return (
                                <ReportList user={user} report={anObjectMapped} address={house.address}/>
                            );
                        })}</div>
                        <div style={{border: '1px solid black',borderRadius: '10px!important', margin:'3px'}}>
                            <b>Resident information:</b>
                            <div><Resident residentList={house.employeeList}/></div>
                            
                        </div>
                        <br/>
                    </div>
                );
            })}
        </div>
    )


    var result = <div>test</div>;
    async function changeState(){
        if (isShow){
            setIsShow(false);
        }else{
            setIsShow(true);

        axios.get("/house/findAllHouse")
            .then(async res => {
            setHouses(res.data);
        });
    }}

    async function loadData(){
        axios.get("/house/findAllHouse")
            .then(async res => {
            setHouses(res.data);
        });
    }

    const [newAddress, setNewAddress] = useState({
        address: '',
        fullName: '',
        phoneNumber: '',
        email: '',
        bed:0,
        mattress: 0,
        table:0,
        chair: 0})
    
    const updateHouseInfo = (field:any) => (e:any) => {
        setNewAddress((prevState) => ({ ...prevState, [field]: e.target.value }));
    }

    function createHouse(){
        var temp = {
            address: newAddress.address,
            landlord: {
                fullName: newAddress.fullName,
                phoneNumber: newAddress.phoneNumber,
                email: newAddress.email
            },
            facility: {
                bed:newAddress.bed,
                mattress: newAddress.mattress,
                table:newAddress.table,
                chair: newAddress.chair,
                report: []},
            employeeList: []
        };
        axios.post("/house/create", temp).then(async res => {
            console.log(res.data);
            if (res.data.result == 'success'){
                loadData();
            }
        });
    }

    return (
        <div>
            <Navbar></Navbar>
            <button onClick={loadData}>loadData</button>
            <div><button onClick={changeState}>Summary View</button></div>
            <div>{isShow?<HousePlacement/>:null}</div>
            

            <div style={{border: '1px solid black',borderRadius: '5px!important',margin:'1px'}}>
                <div><label>New address:</label>
                <input onChange={updateHouseInfo('address')}/></div>
                <div><label>New landlord name:</label>
                <input onChange={updateHouseInfo('fullName')}/></div>
                <div><label>New landlord phone:</label>
                <input onChange={updateHouseInfo('phoneNumber')}/></div>
                <div><label>New landlord email:</label>
                <input onChange={updateHouseInfo('email')}/></div>
                <div><label># of bed:</label>
                <input onChange={updateHouseInfo('bed')}/></div>
                <div><label># of mattress:</label>
                <input onChange={updateHouseInfo('mattress')}/></div>
                <div><label># of table:</label>
                <input onChange={updateHouseInfo('table')}/></div>
                <div><label># of chair:</label>
                <input onChange={updateHouseInfo('chair')}/></div>
                <button onClick={createHouse}>Submit</button>
            </div>
        </div>
    )
}