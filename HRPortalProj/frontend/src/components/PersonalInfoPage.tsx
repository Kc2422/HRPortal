
import React, { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { detailsUser } from "../redux/actions/UserActions";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "../styles/ApplicationPage.css"
import "../styles/PersonalInfoPage.css"
import Navbar from "./Navbar";

interface Props {
    [key: string]: any;
}

function PersonalInfoPage(props: Props) {

    const { reset, register, handleSubmit, watch, formState: { errors }, control } = useForm(
        {
            defaultValues: {

                firstName: "",
                lastName: "",
                middleName: "",
                preferredName: "",
                profilePic: "",
                currentAddress: "",
                cellPhone: "",
                workPhone: "",
                carInfo: { make: "", model: "", color: "", },
                email: "",
                SSN: "",
                DOB: "",
                gender: "",
                citizenOrPermResident: "",
                residentStatus: "",
                workAuthDetails: {
                    workAuth: "",
                    visaTitle: "",
                    startDate: "",
                    endDate: "",
                },
                driverLicenseInfo: {
                    hasDriverLicense: "",
                    licenseNumber: "",
                    expirationDate: "",
                    uploadedCopy: "",

                },
                reference: {
                    firstName: "",
                    lastName: "",
                    middleName: "",
                    phone: "",
                    email: "",
                    relationship: "",
                },
                emergencyContacts: [{
                    firstName: "",
                    lastName: "",
                    middleName: "",
                    phone: "",
                    email: "",
                    relationship: "",
                }],

                optReceipt: { document: "" },
                // applicationStatus: ""





            }

        }
    )
    const [id, setId] = useState("")
    useEffect(() => {
        let object = JSON.parse(localStorage.getItem("userInfo") as string)
        console.log(object)
        setId(object._id)
    }, [])

    useEffect(() => {
        if (!props.user.loading) {
            const values = {

                firstName: props.user.user.firstName,
                lastName: props.user.user.lastName,
                middleName: props.user.user.middleName,
                preferredName: props.user.user.preferredName,
                profilePic: props.user.user.profilePic,
                currentAddress: props.user.user.currentAddress,
                cellPhone: props.user.user.cellPhone,
                workPhone: props.user.user.workPhone,
                carInfo: { make: props.user.user.carInfo.make, model: props.user.user.carInfo.model, color: props.user.user.carInfo.color },
                email: props.user.user.email,
                SSN: props.user.user.SSN,
                DOB: new Date(props.user.user.DOB).toLocaleDateString("en-CA"),
                gender: props.user.user.gender,
                citizenOrPermResident: props.user.user.citizenOrPermResident,
                residentStatus: props.user.user.residentStatus,
                workAuthDetails: {
                    workAuth: props.user.user.workAuthDetails.workAuth,
                    visaTitle: props.user.user.workAuthDetails.visaTitle,
                    startDate: new Date(props.user.user.workAuthDetails.startDate).toLocaleDateString("en-CA"),
                    endDate: new Date(props.user.user.workAuthDetails.endDate).toLocaleDateString("en-CA")
                },
                driverLicenseInfo: {
                    hasDriverLicense: props.user.user.driverLicenseInfo.hasDriverLicense,
                    licenseNumber: props.user.user.driverLicenseInfo.licenseNumber,
                    expirationDate: new Date(props.user.user.driverLicenseInfo.expirationDate).toLocaleDateString("en-CA"),
                    uploadedCopy: props.user.user.driverLicenseInfo.uploadedCopy

                },
                reference: {
                    firstName: props.user.user.reference.firstName,
                    lastName: props.user.user.reference.lastName,
                    middleName: props.user.user.reference.middleName,
                    phone: props.user.user.reference.phone,
                    email: props.user.user.reference.email,
                    relationship: props.user.user.reference.relationship
                },
                emergencyContacts:

                    props.user.user.emergencyContacts,

                optReceipt: {
                    document: props.user.user.optReceipt.document,
                    status: props.user.user.optReceipt.status
                },
                // applicationStatus: ""

            }
            reset(values)
        }
    }, [props])


    // useEffect(() =>{
    //     console.log(id, "id")

    //     if(id){
    //         props.detailslUser(id)
    //     }





    // }, [props.detailslUser])


    const [edit, setEdit] = useState(false)


    const {
        fields,
        append,
        prepend,
        remove,
        swap,
        move,
        insert,
        replace
    } = useFieldArray({
        control,
        name: "emergencyContacts"
    })

    const profilePic: any = watch("profilePic")
    const licensePic: any = watch("driverLicenseInfo.uploadedCopy")
    const opt: any = watch("optReceipt.document")

    const citizen = watch("citizenOrPermResident")
    const workAuth = watch("workAuthDetails.workAuth")
    const driverLicense = watch("driverLicenseInfo.hasDriverLicense")
    useEffect(() => {
        if (profilePic.length === 1) {
            console.log("profilePic", profilePic)
            let item = profilePic["0"]
            const pic = document.getElementById("profilePic") as HTMLImageElement
            pic.src = URL.createObjectURL(item)
            console.log(pic)
        }
    }, [profilePic])

    useEffect(() => {
        if (licensePic.length === 1) {

            let item = licensePic["0"]
            const pic = document.getElementById("license") as HTMLImageElement
            pic.src = URL.createObjectURL(item)
            console.log(pic)
        }
    }, [licensePic])

    useEffect(() => {
        if (opt.length === 1) {

            let item = opt["0"]
            const frame = document.getElementById("pdf") as HTMLIFrameElement
            frame.src = URL.createObjectURL(item)
            console.log(frame)
        }
    }, [opt])

    console.log(driverLicense, opt)
    // this will send data as body in axios request, also needs to store files in AWS S3
    const onSubmit = async (data: any) => {
        console.log(data);
        if (data.profilePic.length === 1) {
            const formData = new FormData();
            formData.append("imageFile", data.profilePic["0"]);
            console.log(formData, "formData")
            const res = await axios.post("/uploadFile", formData)
            console.log("Response from the server", res);
            data.profilePic = res.data.location
        }

        if (data.driverLicenseInfo.uploadedCopy.length === 1) {
            const formData = new FormData();
            formData.append("imageFile", data.driverLicenseInfo.uploadedCopy["0"]);
            const res = await axios.post("/uploadFile", formData)
            data.driverLicenseInfo.uploadedCopy = res.data.location
        }

        if (data.optReceipt.document.length === 1) {
            const formData = new FormData();
            formData.append("imageFile", data.optReceipt.document["0"]);
            const res = await axios.post("/uploadFile", formData)
            data.optReceipt.document = res.data.location
        }

        // need user id from store
        // axios.put("/user/submitApplication/" + id, data )

        axios.put("/user/updateInfo/" + id, data)
            .then(async res => {
                await props.detailsUser(id)

            })
    }


    return (
    <>
        <Navbar></Navbar>
        {props.user.loading ? null :
            <>
                {
                    edit ?
                        <div id="onboardingBody">
                            <button type="button" className="btn btn-danger" onClick={() => setEdit(false)}>Cancel changes</button>
                            <form id="applicationForm" onSubmit={handleSubmit(onSubmit)}>
                                <h1>Edit personal info</h1>
                                <div>
                                    <label htmlFor="">First name*</label>
                                    <input className="form-control" {...register("firstName")} type="text" />
                                </div>

                                <div>
                                    <label htmlFor="">Last name*</label>
                                    <input className="form-control" {...register("lastName")} type="text" />
                                </div>


                                <div>
                                    <label htmlFor="">Middle name</label>
                                    <input className="form-control" {...register("middleName")} type="text" />
                                </div>

                                <div>
                                    <label htmlFor="">Preferred name</label>
                                    <input className="form-control" {...register("preferredName")} type="text" />
                                </div>

                                <div>
                                    <label htmlFor="">Upload profile pic</label>
                                    <input className="form-control" accept="image/*" {...register("profilePic")} type="file" />
                                </div>

                                <div>
                                    <label htmlFor="">Current address </label>
                                    <input className="form-control" {...register("currentAddress")} type="text" />
                                </div>
                                <div>
                                    <label htmlFor=""> Personal phone*</label>
                                    <input className="form-control" {...register("cellPhone")} type="text" />
                                </div>

                                <div>
                                    <label htmlFor="">Work phone</label>
                                    <input className="form-control" {...register("workPhone")} type="text" />
                                </div>



                                <div>
                                    <p>Car info</p>
                                    <div>

                                        <label htmlFor="">Make</label>
                                        <input className="form-control" {...register("carInfo.make")} type="text" />


                                        <label htmlFor="">Model</label>
                                        <input className="form-control" {...register("carInfo.model")} type="text" />

                                        <label htmlFor="">Color</label>
                                        <input className="form-control" {...register("carInfo.color")} type="text" />
                                    </div>
                                </div>
                                {/* need user info */}
                                <div>
                                    <label htmlFor="">Email*</label>
                                    <input className="form-control" {...register("email")} type="text" readOnly />
                                </div>

                                <div>
                                    <label htmlFor="">SSN</label>
                                    <input className="form-control" {...register("SSN")} type="text" />
                                </div>

                                <div>
                                    <label htmlFor="">DOB</label>
                                    <input className="form-control" {...register("DOB")} type="Date" />
                                </div>

                                <div>
                                    <label htmlFor="">Gender</label>
                                    <select className="form-select" {...register("gender")}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="N/A">I do not wish to answer</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="">Work Status</label>
                                    <label htmlFor="">Are you a citizen or permanent resident of the U.S.?</label>
                                    <div>

                                        <label className="form-check-label" htmlFor="">Yes</label>
                                        <input className="form-check-input" {...register("citizenOrPermResident")} type="radio" value="yes" />
                                        <br />
                                        <label className="form-check-label" htmlFor="">No</label>
                                        <input className="form-check-input" {...register("citizenOrPermResident")} type="radio" value="no" />
                                    </div>
                                    {citizen === "yes" ?
                                        <>
                                            <label htmlFor="">Green card or citizen?</label>
                                            <div>

                                                <label className="form-check-label" htmlFor="">Green card </label>
                                                <input {...register("residentStatus")} type="radio" name="residentStatus" />

                                            </div>
                                            <label className="form-check-label" htmlFor="">Citizen </label>
                                            <input className="form-check-input" {...register("residentStatus")} type="radio" name="residentStatus" />

                                        </> : null
                                    }

                                    {citizen === "no" ?
                                        <>
                                            <div>
                                                <label htmlFor="">What is your work authorization</label>
                                                <select className="form-select" {...register("workAuthDetails.workAuth")} >
                                                    <option value=""></option>
                                                    <option value="H1-B">H1-B</option>
                                                    <option value="L2">L2</option>
                                                    <option value="F1">F1</option>
                                                    <option value="H4">H4</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                {workAuth === "F1" ?

                                                    <div>
                                                        <label htmlFor="">Upload OPT receipt</label>
                                                        <input className="form-control" {...register("optReceipt.document")} type="file" accept="application/pdf" />
                                                    </div> : null
                                                }
                                                {workAuth === "Other" ?
                                                    <div>

                                                        <label htmlFor="">Visa title</label>
                                                        <input className="form-control" {...register("workAuthDetails.visaTitle")} type="text" />
                                                    </div> : null
                                                }
                                                <label htmlFor="">Start date</label>
                                                <input className="form-control" {...register("workAuthDetails.startDate")} type="date" />
                                                <label htmlFor="">End date</label>
                                                <input className="form-control" {...register("workAuthDetails.endDate")} type="date" />

                                            </div>
                                        </> : null

                                    }
                                </div>



                                <div>
                                    <label htmlFor="">Do you have a driver's license</label>
                                    <div>

                                        <label htmlFor="">Yes</label>
                                        <input {...register("driverLicenseInfo.hasDriverLicense")} type="radio" value="yes" />
                                    </div>
                                    <div>

                                        <label htmlFor="">No</label>
                                        <input {...register("driverLicenseInfo.hasDriverLicense")} type="radio" value="no" />
                                    </div>
                                </div>
                                {driverLicense === "yes" ?
                                    <>
                                        <div>
                                            <label htmlFor="">License number</label>
                                            <input className="form-control" {...register("driverLicenseInfo.licenseNumber")} type="text" />
                                        </div>

                                        <div>
                                            <label htmlFor="">Expiration Date</label>
                                            <input className="form-control" {...register("driverLicenseInfo.expirationDate")} type="date" />

                                        </div>
                                        <label htmlFor="">Upload copy</label>
                                        <input className="form-control" {...register("driverLicenseInfo.uploadedCopy")} type="file" />


                                    </> : null}

                                <div>
                                    <p>Reference</p>
                                    <div>

                                        <label htmlFor="">First Name</label>
                                        <input className="form-control" {...register("reference.firstName")} type="text" />
                                    </div>

                                    <div>
                                        <label htmlFor="">Last Name</label>
                                        <input className="form-control" {...register("reference.lastName")} type="text" />
                                    </div>

                                    <div>
                                        <label htmlFor="">Middle Name</label>
                                        <input className="form-control" {...register("reference.middleName")} type="text" />
                                    </div>

                                    <div>
                                        <label htmlFor="">Phone number</label>
                                        <input className="form-control" {...register("reference.phone")} type="text" />

                                    </div>

                                    <div>
                                        <label htmlFor="">Email</label>
                                        <input className="form-control" {...register("reference.email")} type="text" />
                                    </div>

                                    <div>
                                        <label htmlFor="">Relationship</label>
                                        <input className="form-control" {...register("reference.relationship")} type="text" />
                                    </div>
                                </div>

                                <div>
                                    <p>Emergency Contact(s)</p>
                                    {fields.map((item, index) => {
                                        return (
                                            <>

                                                <div>
                                                    <p>Contact #{index + 1}</p>
                                                    <label htmlFor="">First name</label>
                                                    <input
                                                        className="form-control"
                                                        {...register(`emergencyContacts.${index}.firstName`)}
                                                    />
                                                </div>

                                                <div>

                                                    <label htmlFor="">Last name</label>
                                                    <input className="form-control" {...register(`emergencyContacts.${index}.lastName`)} type="text" />
                                                </div>
                                                <div>
                                                    <label htmlFor="">Middle name</label>
                                                    <input className="form-control" {...register(`emergencyContacts.${index}.middleName`)} type="text" />
                                                </div>

                                                <div>
                                                    <label htmlFor="">Phone number</label>
                                                    <input className="form-control" {...register(`emergencyContacts.${index}.phone`)} type="text" />
                                                </div>

                                                <div>
                                                    <label htmlFor="">Email</label>
                                                    <input className="form-control" {...register(`emergencyContacts.${index}.email`)} type="text" />
                                                </div>

                                                <div>
                                                    <label htmlFor="">Relationship</label>
                                                    <input className="form-control" {...register(`emergencyContacts.${index}.relationship`)} type="text" />
                                                </div>
                                                {index === 0 ? null :

                                                    <button className="btn btn-danger" type="button" onClick={() => remove(index)}>
                                                        Delete contact
                                                    </button>
                                                }
                                                <button type="button" className="btn btn-success" onClick={() => append({
                                                    firstName: "",
                                                    lastName: "",
                                                    middleName: "",
                                                    phone: "",
                                                    email: "",
                                                    relationship: ""
                                                })} >Add contact</button>
                                            </>

                                        )
                                    })}
                                </div>
                                <input className="btn btn-primary" type="submit" />
                                <p>Uploaded docs</p>
                                {profilePic.length ?
                                    <>
                                        <p>Profile pic</p>
                                        <img id="profilePic" src="#" width="50vw" height="50vh" />
                                    </>
                                    : null
                                }
                                {
                                    licensePic.length ?
                                        <>
                                            <p>Driver's license</p>
                                            <img id="license" src="#" width="50vw" height="50vh" />
                                        </>
                                        : null
                                }

                                {opt.length ?
                                    <>
                                        <p>OPT Form</p>
                                        <embed
                                            id="pdf"
                                            src=""
                                            width="250"
                                            height="200" />
                                    </>
                                    : null
                                }
                            </form>
                        </div>






                        :
                        <>
                            <button className="btn btn-primary" type="button" onClick={() => {
                                setEdit(true)
                            }}>Edit info</button>
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
                            <p>DOB: {props.user.user.DOB.slice(0, 10)}</p>
                            <p>Gender: {props.user.user.gender}</p>
                            <p>Is citizen/permanent resident? {props.user.user.citizenOrPermResident}</p>
                            {props.user.user.citizenOrPermResident === "yes" ?
                                <p>Resident status: {props.user.user.residentStatus}</p>
                                :
                                <>
                                    <p>Work authorization: {props.user.user.workAuthDetails.workAuth}</p>
                                    <p>Visa title: {props.user.user.workAuthDetails.visaTitle}</p>
                                    <p>Start date: {props.user.user.workAuthDetails.startDate.slice(0, 10)}</p>
                                    <p>End date:  {props.user.user.workAuthDetails.endDate.slice(0, 10)}</p>
                                </>

                            }
                            <p>Driver license? {props.user.user.driverLicenseInfo.hasDriverLicense}</p>

                            <p>License number: {props.user.user.driverLicenseInfo.licenseNumber}</p>

                            <p>Expiration date: {props.user.user.driverLicenseInfo.expirationDate.slice(0, 10)}</p>

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
                }
            </>
}
    </>

    )
}

function mapStateToProps(state: any) {
    console.log(state, "state")
    return { user: state.userDetails }
}

const mapDispatchToProps = {
    detailsUser: detailsUser
}
export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfoPage)

