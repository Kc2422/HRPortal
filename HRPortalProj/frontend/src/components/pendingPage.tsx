import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { detailsUser } from "../redux/actions/UserActions";
import { connect } from "react-redux";

interface Props {
    [key: string]: any;
}

const PendingPage = (props: Props) => {
    const navigate = useNavigate()
    const [id, setId] = useState("")
    console.log(props)
    useEffect(() => {
        let object = JSON.parse(localStorage.getItem("userInfo") as string)
        console.log(object)
        setId(object._id)
        // axios.get("/user/profile" + localStorage.getItem())
    }, [])



    return (
        props.user.loading?null:

        <>
            <h1>You have submitted your application please wait for approval</h1>
            <h1>Personal info</h1>
            <p>

                <img id="profilePic" src={props.user.user.profilePic} alt="" />
                <strong>

                    {`${props.user.user.firstName} ${props.user.user.middleName} ${props.user.user.lastName}`}
                </strong>
            </p>
            <p>Current address: {props.user.user.currentAddress}</p>
            <p>Cell phone: {props.user.user.cellPhone}</p>
            <p>Work phone: {props.user.user.workPhone}</p>
            <p> <strong>Car info: </strong> {`Make: ${props.user.user.carInfo.make} Model: ${props.user.user.carInfo.model} Color: ${props.user.user.carInfo.color}`}</p>
            <p>Email: {props.user.user.email}</p>
            <p>SSN: {props.user.user.SSN}</p>
            {/* <p>DOB: {props.user.user.DOB.slice(0, 10)}</p> */}
            <p>Gender: {props.user.user.gender}</p>
            <p>Is citizen/permanent resident? {props.user.user.citizenOrPermResident}</p>
            {props.user.user.citizenOrPermResident === "yes" ?
                <p>Resident status: {props.user.user.residentStatus}</p>
                :
                <>
                    <p>Work authorization: {props.user.user.workAuthDetails.workAuth}</p>
                    <p>Visa title: {props.user.user.workAuthDetails.visaTitle}</p>
                    {/* <p>Start date: {props.user.user.workAuthDetails.startDate.slice(0, 10)}</p>
                    <p>End date:  {props.user.user.workAuthDetails.endDate.slice(0, 10)}</p> */}
                </>

            }
            <p>Driver license? {props.user.user.driverLicenseInfo.hasDriverLicense}</p>

            <p>License number: {props.user.user.driverLicenseInfo.licenseNumber}</p>

            {/* <p>Expiration date: {props.user.user.driverLicenseInfo.expirationDate.slice(0, 10)}</p> */}

            <p>Uploaded copy
                {props.user.user.driverLicenseInfo.uploadedCopy ?

                    <a href={props.user.user.driverLicenseInfo.uploadedCopy}>Link</a> : null
                }


            </p>

            <p> <strong>Reference</strong></p>
            <p> First name {props.user.user.reference.firstName}</p>
            <p>Last name {props.user.user.reference.lastName}</p>
            <p>Phone number {props.user.user.reference.phoneNumber}</p>
            <p>Email {props.user.user.reference.email}</p>
            <p>Relationship {props.user.user.reference.relationship}</p>
            {props.user.user.emergencyContacts.map((ref: any) => {
                return (
                    <>
                        <p> <strong>Emergency contact</strong></p>
                        <p>First name {ref.firstName}</p>
                        <p>Last name {ref.lastName}</p>
                        <p>Phone Number {ref.phoneNumber}</p>
                        <p>Email {ref.email}</p>
                        <p>Relationship {ref.relationship}</p>
                    </>
                )

            })}


        </>
        
    )


}


function mapStateToProps(state: any) {

    return { user: state.userDetails }
}

const mapDispatchToProps = {
    detailsUser: detailsUser
}
export default connect(mapStateToProps, mapDispatchToProps)(PendingPage)