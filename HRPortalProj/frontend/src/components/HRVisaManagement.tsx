import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form"
import Navbar from "./Navbar";
interface data{[key:string]: any}

function HRVisaManagement(props: any) {
    const [allUsers, setAllUsers] = useState([])
    const [showAll, setShowAll] = useState(false)
    const [search, setSearch] = useState("")
    const [search2, setSearch2] = useState("")

    useEffect(() => {
        axios.get("/user/hr/getVisaEmployees")
            .then(res => {
                console.log(res.data)
                setAllUsers(res.data.employees)
            })
    }, [])

    const manageStatus = (id:any, doc:string, docDetails:any, status:string) => {
        const data: data = {}
        data[doc] = docDetails
        data[doc].status = status
        if(status === "rejected"){
            const message = document.getElementById(`${doc}${id}`) as HTMLInputElement
            data[doc].errorMessage = message.value
        
        }
        console.log(data)
        axios.put("/user/hr/updateVisaStatus/" + id,data) 
        .then(data => console.log(data))
    } 

    const reminderEmail = (email: string ) => {
        axios.post("/hr/sendReminder", {email: email})
        .then(res => {console.log(res)})
    }


    return (
        <>
        <Navbar></Navbar>
            <h1>Visa management page</h1>
            {showAll ?
                <>
                    <button onClick={() => { setShowAll(false) }} > Show All Visa Users </button>
                    <label htmlFor="">Search for users</label>
                    <input type="text" onChange={(e) => { setSearch(e.target.value) }} />

                    {allUsers.filter((user: any) => user.firstName.includes(search) || user.lastName.includes(search) || user.preferredName.includes(search)).map((user: any) =>

                        <>

                            <h1>Summary</h1>

                            <p>Next step </p>

                            {user.applicationStatus === "not submitted" ? <p>Submit application  </p> :
                                user.optReceipt.status === "pending" ? <p>Waiting for opt receipt approval</p> :
                                    user.optReceipt.status === "rejected" ? <p>Resubmit OPT receipt</p> :
                                        user.optEad.status === "not submitted" ? <p>Submit optEad</p> :
                                            user.optEad.status === "pending" ? <p>Waiting for opt Ead approval</p> :
                                                user.optEad.status === "rejected" ? <p>Resubmit OPT Ead</p> :
                                                    user.I983.status  === "not submitted" ? <p>Submit I983</p> :
                                                        user.I983.status === "pending" ? <p>Waiting for I983 approval</p> :
                                                            user.I983.status === "rejected" ? <p>Resubmit I983</p> :
                                                                user.I20.status  === "not submitted" ? <p>Submit I20</p> :
                                                                    user.I20.status === "pending" ? <p>Waiting for I20 approval</p> :
                                                                        user.I20.status === "rejected" ? <p>Resubmit I20</p> :
                                                                            <p>No actions left to take</p>
                            }

                            <p>Onboarding application status {user.applicationStatus}</p>
                            <p>Name {user.firstName} {user.lastName}</p>

                            {user.optReceipt.status  !== "not submitted"?
                                <>
                                    <a href={user.optReceipt.document}>OPT receipt</a>
                                    <p>OPT receipt status: {user.optReceipt.status}</p>
                                </>

                                :
                                <p>not submitted</p>


                            }
                            {user.optEad.status !== "not submitted"  ?
                                <>
                                    <a href={user.optEad.document}>OPT Ead</a>
                                    <p>OPT Ead status: {user.optEad.status}</p>
                                </>

                                :
                                <p>OPT EAD: not submitted</p>


                            }
                            {user.I983.status !== "not submitted" ?
                                <>
                                    <a href={user.I983.document}>I983</a>
                                    <p>I983 status: {user.I983.status}</p>
                                </>

                                :
                                <p>I983: not submitted</p>


                            }

                            {user.I20.status !== "not submitted" ?
                                <>
                                    <a href={user.I20.document}>I20</a>
                                    <p>I20 status: {user.I20.status}</p>
                                </>

                                :
                                <p>I20: not submitted</p>


                            }


                        </>


                    )}


                </>


                :

                <>
                    <button onClick={() => { setShowAll(true) }} > Show Visa users in progress</button>
                    

                    {allUsers.filter(
                        (user: any) => user.I20.status !== "accepted" && (
                            user.firstName.includes(search2) || user.lastName.includes(search2) || user.preferredName.includes(search2)
                        )
                    ).map((user: any) =>

                        <>

                            <h1>Summary</h1>

                            <p>Next step </p>

                            {user.applicationStatus === "not submitted" ? <p>Submit application <button onClick={ () => reminderEmail(user.email)}>Send reminder</button> </p> :
                                user.optReceipt.status === "pending" ? <p>Waiting for opt receipt approval</p> :
                                    user.optReceipt.status === "rejected" ? <p>Resubmit OPT receipt <button onClick={ () => reminderEmail(user.email)}>Send reminder</button> </p> :
                                        user.optEad.status === "not submitted" ? <p>Submit optEad <button onClick={ () => reminderEmail(user.email)}>Send reminder</button> </p> :
                                            user.optEad.status === "pending" ? <p>Waiting for opt Ead approval</p> :
                                                user.optEad.status === "rejected" ? <p>Resubmit OPT Ead <button onClick={ () => reminderEmail(user.email)}>Send reminder</button> </p> :
                                                    user.I983.status === "not submitted" ? <p>Submit I983 <button onClick={ () => reminderEmail(user.email)}>Send reminder</button> </p> :
                                                        user.I983.status === "pending" ? <p>Waiting for I983 approval</p> :
                                                            user.I983.status === "rejected" ? <p>Resubmit I983 <button onClick={ () => reminderEmail(user.email)}>Send reminder</button> </p> :
                                                                user.I20.status === "not submitted" ? <p>Submit I20 <button onClick={ () => reminderEmail(user.email)}>Send reminder</button> </p> :
                                                                    user.I20.status === "pending" ? <p>Waiting for I20 approval</p> :
                                                                        user.I20.status === "rejected" ? <p>Resubmit I20 <button onClick={ () => reminderEmail(user.email)}>Send reminder</button> </p> :
                                                                            <p>No actions left to take</p>
                            }

                            <p>Onboarding application status {user.applicationStatus}</p>
                            <p>Name {user.firstName} {user.lastName}</p>

                            {user.optReceipt.status !== "not submitted" ?
                                <>
                                    <a href={user.optReceipt.document}>OPT receipt</a>
                                    <p>OPT receipt status: {user.optReceipt.status}</p>
                                    {user.optReceipt.status === "pending" ?
                                        <>
                                            <button onClick={() => {manageStatus(user._id, "optReceipt", user.optReceipt, "accepted")}}>Approve</button>
                                            

                                                <label htmlFor="">Reject reason</label>
                                                <input type="text" id={`optReceipt${user._id}`}/>
                                                <button onClick={() => {manageStatus(user._id, "optReceipt", user.optReceipt, "rejected")}}>Reject</button>
                                                
                                            
                                        </>:
                                        <p>{user.optReceipt.errorMessage}</p>

}
                                </>

                                :
                                <p>not submitted</p>


                            }
                            {user.optEad.status  !== "not submitted"?
                                <>
                                    <a href={user.optEad.document}>OPT Ead</a>
                                    <p>OPT Ead status: {user.optEad.status}</p>
                                    {user.optEad.status === "pending" ?
                                        <>
                                            <button onClick={() => {manageStatus(user._id, "optEad", user.optEad, "accepted")}}>Approve</button>
                                            

                                                <label htmlFor="">Reject reason</label>
                                                <input type="text" id={`optEad${user._id}`}/>
                                                <button onClick={() => {manageStatus(user._id, "optEad", user.optEad, "rejected")}}>Reject</button>
                                                
                                            
                                        </>:
                                        <p>{user.optEad.errorMessage}</p>

}
                                </>

                                :
                                <p>OPT EAD: not submitted</p>


                            }
                            {user.I983.status  !== "not submitted"?
                                <>
                                    <a href={user.I983.document}>I983</a>
                                    <p>I983 status: {user.I983.status}</p>
                                    {user.I983.status === "pending" ?
                                        <>
                                            <button onClick={() => {manageStatus(user._id, "I983", user.I983, "accepted")}}>Approve</button>
                                            

                                                <label htmlFor="">Reject reason</label>
                                                <input type="text" id={`I983${user._id}`}/>
                                                <button onClick={() => {manageStatus(user._id, "I983", user.I983, "rejected")}}>Reject</button>
                                                
                                            
                                        </>:
                                        <p>{user.I983.errorMessage}</p>

}


                                </>


                                :
                                <p>I983: not submitted</p>


                            }

                            {user.I20.status  !== "not submitted"?
                                <>
                                    <a href={user.I20.document}>I20</a>
                                    <p>I20 status: {user.I20.status}</p>
                                    {user.I20.status === "pending" ?
                                        <>
                                            <button onClick={() => {manageStatus(user._id, "I20", user.I20, "accepted")}}>Approve</button>
                                            

                                                <label htmlFor="">Reject reason</label>
                                                <input type="text" id={`I20${user._id}`}/>
                                                <button onClick={() => {manageStatus(user._id, "I20", user.I20, "rejected")}}>Reject</button>
                                                
                                            
                                        </>:
                                        <p>{user.I20.errorMessage}</p>

}
                                </>

                                :
                                <p>I20: not submitted</p>


                            }


                        </>


                    )}




                </>

            }
        </>
    )
}

export default HRVisaManagement