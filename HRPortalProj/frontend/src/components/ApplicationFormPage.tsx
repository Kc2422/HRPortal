import {useState} from 'react';
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ApplicationFormPage(){
    const [params, setParams] = useSearchParams();
    var format: any = {};
    const [userInfo, setUserInfo] = useState(format);
    var user = params.get("user");
    
    axios.get("/house/findUser/"+user).then(async res => {
        
        setUserInfo(res.data[0]);
    });

    




    return (
        <div>
            <div  style={{border: '1px solid black',borderRadius: '5px!important',margin:'1px'}}>
                First name: {userInfo.firstName?userInfo.firstName:'None'}.
                Last name: {userInfo.lastName?userInfo.lastName:'None'}.
                Middle name: {userInfo.middleName?userInfo.middleName:'None'}.
                Preferred name: {userInfo.preferredName?userInfo.preferredName:'None'}.
            </div>
            <div style={{border: '1px solid black',borderRadius: '5px!important',margin:'1px'}}>
                Current Address: {userInfo.currentAddress?userInfo.currentAddress:'None'}.
            </div>
            <div style={{border: '1px solid black',borderRadius: '5px!important',margin:'1px'}}>
                CellPhone: {userInfo.cellPhone?userInfo.cellPhone:'None'}.
                WorkPhone: {userInfo.workPhone?userInfo.workPhone:'None'}.
            </div>
            <div style={{border: '1px solid black',borderRadius: '5px!important',margin:'1px'}}>
                SSN:{userInfo.SSN?userInfo.SSN:'None'}.
                DOB:{userInfo.DOB?userInfo.DOB:'None'}.
            </div>
            <div style={{border: '1px solid black',borderRadius: '5px!important',margin:'1px'}}>
                Status:{userInfo.citizenOrPermResident?userInfo.citizenOrPermResident:'None'}.
                workAuthDetails:{userInfo.workAuthDetails?'Provided':'None'}.
            </div>
            <div style={{border: '1px solid black',borderRadius: '5px!important',margin:'1px'}}>
                Driver License:{userInfo.driverLicenseInfo?'Provided':'None'}.
            </div>
            <div style={{border: '1px solid black',borderRadius: '5px!important',margin:'1px'}}>
                Reference: {userInfo.reference?'Provided':'None'}.
            </div>
            <div style={{border: '1px solid black',borderRadius: '5px!important',margin:'1px'}}>
                Emergency Contact: {userInfo.emergencyContacts?'Provided':'None'}.
            </div>

        </div>
    )
}