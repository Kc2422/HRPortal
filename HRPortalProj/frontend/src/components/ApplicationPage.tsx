import React, { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup"
import axios from "axios";
import { connect } from "react-redux";
import { detailsUser } from "../redux/actions/UserActions";
import "../styles/ApplicationPage.css"

interface Props{
    [key: string]: any;
  }

function ApplicationPage(props: Props) {
    const [ id, setId] = useState("")
    const navigate = useNavigate()
    useEffect(() =>{
        if(props.user.user.applicationStatus == "accepted"){
            navigate("/personalInfo")
        }
        if(props.user.user.applicationStatus == "pending"){
            navigate("/pending")
        }
    },[])

    useEffect(() => {
        let object = JSON.parse(localStorage.getItem("userInfo") as string)
        console.log(object)
        setId(object._id)
        // axios.get("/user/profile" + localStorage.getItem())
    },[])

    const { register, handleSubmit, watch, setValue, formState: { errors }, control } = useForm({
        defaultValues: {

            firstName: "",
            lastName: "",
            middleName: "",
            preferredName: "",
            profilePic: "",
            currentAddress: "",
            cellPhone: "",
            workPhone: "",
            carInfo: { make: "", model: "", color: "" },
            email: props.user.user.email,
            SSN: "",
            DOB: "",
            gender: "",
            citizenOrPermResident: "",
            residentStatus: "",
            workAuthDetails: {
                workAuth: "",
                visaTitle: "",
                startDate: "",
                endDate: ""
            },
            driverLicenseInfo: {
                hasDriverLicense: "",
                licenseNumber: "",
                expirationDate: "",
                uploadedCopy: ""

            },
            reference: {
                firstName: "",
                lastName: "",
                middleName: "",
                phone: "",
                email: "",
                relationship: ""
            },
            emergencyContacts: 

                [{
                    firstName: "",
                    lastName: "",
                    middleName: "",
                    phone: "",
                    email: "",
                    relationship: ""
                }],

            optReceipt: {
                document: "",
                statust: "not submitted"
            },
                
            optEad: {document: "",
                status: "not submitted"
            },

                I983: {
                    document: "",
                    status: "not submitted",
                    
                  },
              
                  I20: {
                    document: "",
                    status: "not submitted",
                  },
                    
            applicationStatus: "pending"
            
                
                
                
                
            }
            
        }
        )
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
          
          const profilePic = watch("profilePic") as unknown as FileList
          const licensePic = watch("driverLicenseInfo.uploadedCopy") as unknown as FileList
          const opt = watch("optReceipt.document") as unknown as FileList

          const citizen = watch("citizenOrPermResident")
          const workAuth = watch("workAuthDetails.workAuth")
          const driverLicense = watch("driverLicenseInfo.hasDriverLicense")
          useEffect(() => {
              if(profilePic.length){
                  console.log("profilePic", profilePic)
                let item = profilePic["0"]
                const pic = document.getElementById("profilePic") as HTMLImageElement
                pic.src = URL.createObjectURL(item)
                console.log(pic)
              }
          },[profilePic])

          useEffect(() => {
            if(licensePic.length){
                
              let item = licensePic["0"]
              const pic = document.getElementById("license") as HTMLImageElement
              pic.src = URL.createObjectURL(item)
              console.log(pic)
            }
          }, [licensePic])

          useEffect(() => {
            if(opt.length){
                
              let item = opt["0"]
              const frame = document.getElementById("pdf") as HTMLIFrameElement
              frame.src = URL.createObjectURL(item)
              console.log(frame)
            }
          }, [opt])

    console.log(driverLicense, opt)
    // this will send data as body in axios request, also needs to store files in AWS S3
    const onSubmit = async (data: any) => {
        setValue("applicationStatus", "pending")
        console.log(data);
        if(data.profilePic){
            const formData = new FormData();
            formData.append("imageFile", data.profilePic["0"]);
            console.log(formData, "formData")
            const res = await axios.post("/uploadFile", formData)
            console.log("Response from the server", res);
            data.profilePic = res.data.location
        }

        if(data.driverLicenseInfo.uploadedCopy){
            const formData = new FormData();
            formData.append("imageFile", data.driverLicenseInfo.uploadedCopy["0"]);
            const res = await axios.post("/uploadFile", formData)
            data.driverLicenseInfo.uploadedCopy = res.data.location
        }

        if(data.optReceipt.document){
            const formData = new FormData();
            formData.append("imageFile", data.optReceipt.document["0"]);
            const res = await axios.post("/uploadFile", formData)
            data.optReceipt.document = res.data.location
            data.optReceipt.status = "pending"
        }
        

        // need user id from store
        axios.put("/user/submitApplication/" + id, data )
        .then(async () => {

            await props.detailsUser(id)
            .then(

                navigate("/pending")
            )
        })
    }


    return (
        // If never submitted, form will display
        // 
        <>
        <div id="onboardingBody">

            <form id="applicationForm" onSubmit={handleSubmit(onSubmit)}>
        <h1>Onboarding Application form</h1>
                <div>
                    <label htmlFor="">First name*</label>
                    <input className="form-control" {...register("firstName")} type="text" required/>
                </div>

                <div>
                    <label htmlFor="">Last name*</label>
                    <input className="form-control" {...register("lastName")} type="text" required />
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
                    <label htmlFor="">Current address* </label>
                    <input className="form-control" {...register("currentAddress")} type="text" required />
                </div>
                <div>
                    <label htmlFor=""> Personal phone*</label>
                    <input className="form-control" {...register("cellPhone")} type="text" required />
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
                        <input className="form-control" {...register("email")} type="text" value={props.user.user.email} readOnly/>
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
                                        <input className="form-control" {...register("optReceipt.document")} type="file" accept="application/pdf"/>
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
                    {fields.map((item,index) => {
                        return(
                        <>
                        
                        <div>
                            <p>Contact #{index+1}</p>
                        <label htmlFor="">First name</label>
                          <input
                          className="form-control"
                            {...register(`emergencyContacts.${index}.firstName`)}
                          />
                        </div>

                        <div>

                          <label htmlFor="">Last name</label>
                          <input className="form-control" {...register(`emergencyContacts.${index}.lastName`)}  type="text" />
                        </div>
                        <div>
                        <label htmlFor="">Middle name</label>
                          <input className="form-control" {...register(`emergencyContacts.${index}.middleName`)}  type="text" />
                        </div>

                        <div>
                            <label htmlFor="">Phone number</label>
                            <input className="form-control" {...register(`emergencyContacts.${index}.phone`)}  type="text" />
                        </div>

                        <div>
                        <label htmlFor="">Email</label>
                            <input className="form-control" {...register(`emergencyContacts.${index}.email`)}  type="text" />
                        </div>

                        <div>
                        <label htmlFor="">Relationship</label>
                            <input className="form-control" {...register(`emergencyContacts.${index}.relationship`)}  type="text" />
                        </div>
                            {index===0?null:
                            
                          <button className="btn btn-danger" type="button" onClick={() => remove(index)}>
                            Delete contact
                          </button>
                            }
                          <button  type="button" className="btn btn-success" onClick={() => append({
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
            {profilePic.length?
<>
<p>Profile pic</p>
<img id="profilePic" src="#" width="50vw" height="50vh" />
</>
:null
}
            {
                licensePic.length?
                <>
                <p>Driver's license</p>
                <img id="license" src="#" width="50vw" height="50vh"/>
                </>
                :null
            }

            {opt.length?
    <>
    <p>OPT Form</p>
    <embed 
id="pdf"
src=""
width="250"
height="200"/>
    </>
       :null
    }
    </form>
        </div>

        </>
    )
}
function mapStateToProps(state: any){
    console.log(state, "state")
    return {user: state.userDetails}
  }
  
  const mapDispatchToProps = {
    detailsUser: detailsUser
  }

  export default connect(mapStateToProps, mapDispatchToProps)(ApplicationPage)

