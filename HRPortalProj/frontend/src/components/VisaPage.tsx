  import React, { useEffect, useState } from "react";
  import { useForm, Controller, useFieldArray } from "react-hook-form"
  import { yupResolver } from "@hookform/resolvers/yup"
  import { detailsUser } from "../redux/actions/UserActions";
  import { connect } from "react-redux";
  import { useSelector, useDispatch } from "react-redux";
  import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

  interface Props{
    [key: string]: any;
  }

function VisaStatusPage(props: Props) {
  const navigate = useNavigate()
  const [ id, setId] = useState("")
    useEffect(() => {
        let object = JSON.parse(localStorage.getItem("userInfo") as string)
        
        setId(object._id)
        
        // axios.get("/user/profile" + localStorage.getItem())
    },[])

    useEffect(()=> {
      console.log(props, props)

if(!props.user.loading){
  const values = {

    optReceipt: {document: props.user.user.optReceipt.document,
                status: props.user.user.optReceipt.status}, 

            optEad: {document: props.user.user.optEad.document,
                    status: props.user.user.optEad.status
                },

                    I983: {
                        document: props.user.user.I983.document,
                        status: props.user.user.I983.status,
                        
                      },
                  
                      I20: {
                        document: props.user.user.I20.document,
                        status: props.user.user.I20.status,
                        
                      },

    
}

reset(values)
}

},[props])
    
    const { register, handleSubmit, reset, watch, setValue, formState: { errors }, control } = useForm({
        defaultValues: {

          optReceipt: {document: ""}, 

          optEad: {document: "",
                  status: ""
              },
      
                  I983: {
                      document: "",
                      status: "",
                      
                    },
                
                    I20: {
                      document: "",
                      status: "",
                      
                    },
            
        }
    })

    const onSubmit = async (data: any) => {
      if(data.optReceipt.document.length === 1){
        const formData = new FormData();
        formData.append("imageFile", data.optReceipt.document["0"]);
        
        const res = await axios.post("/uploadFile", formData)
        
        data.optReceipt.document = res.data.location
        data.optReceipt.status = "pending"
      }
      if(data.optEad.document.length === 1){
        const formData = new FormData();
        formData.append("imageFile", data.optEad.document["0"]);
        
        const res = await axios.post("/uploadFile", formData)
        
        data.optEad.document = res.data.location
        data.optEad.status = "pending"
      }
      if(data.I983.document.length === 1){
        const formData = new FormData();
        formData.append("imageFile", data.I983.document["0"]);
        
        const res = await axios.post("/uploadFile", formData)
        
        data.I983.document = res.data.location
        data.I983.status = "pending"
      }
      
      if(data.I20.document.length === 1){
        const formData = new FormData();
        formData.append("imageFile", data.I20.document["0"]);
        
        const res = await axios.post("/uploadFile", formData)
        
        data.I20.document = res.data.location
        data.I20.status = "pending"
      }
      
      console.log(data)
      axios.put("/user/updateInfo/" + id, data)
      .then(async res => {
          await props.detailsUser(id)
          
        })


    }

    

    return(
      <>
      <Navbar></Navbar>
      {props.user.loading?<p>Submitted</p>:
        <>
        <p>Your next step:</p>
       { props.user.user.optReceipt.status === "accepted"?null:props.user.user.optReceipt.status === "pending"? <p>Please wait for HR to approve your document</p>: 
       <>

       <form onSubmit={handleSubmit(onSubmit)}>
       <label htmlFor="">Upload optReceipt</label>
       <input {...register("optReceipt.document")} type="file" accept="application/pdf" />
       <input type="submit" />
   </form> 
       {props.user.user.optReceipt.status === "rejected"? <p>{props.user.user.optReceipt.errorMessage}</p>: null}
       </>
}

{
props.user.user.optReceipt.status === "accepted"?

props.user.user.optEad.status === "accepted"?null: props.user.user.optEad.status === "pending"? <p>Please wait for HR to approve your document</p>:
        <>  
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="">Upload optEad</label>
            <input {...register("optEad.document")} type="file" accept="application/pdf" />
            <input type="submit" />
        </form> 
        {props.user.user.optEad.status === "rejected"? <p>{props.user.user.optEat.errorMessage}</p>: null}
        </>: null
}

{
  props.user.user.optEad.status === "accepted"?
    props.user.user.I983.status === "accepted"?null: props.user.user.I983.status === "pending"? <p>Please wait for HR to approve your document</p>:  
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">Upload I-983</label>
        <input {...register("I983.document")} type="file" accept="application/pdf" />
        <input type="submit" />
    </form> 
    {props.user.user.I983.status === "rejected"? <p>{props.user.user.I983.errorMessage}</p>: null}
    </>:null
}


{
  props.user.user.I983.status === "accepted"?
    props.user.user.I20.status === "accepted"?<p>All documents have been approved</p>: props.user.user.I20.status === "pending"? <p>Please wait for HR to approve your document</p>:  
    <>
    <form onSubmit={handleSubmit(onSubmit)} >
        <label htmlFor="">Upload I-20</label>
        <input {...register("I20.document")} type="file" accept="application/pdf" />
        <input type="submit" />
    </form> 
    {props.user.user.I20.status === "rejected"? <p>{props.user.user.I20.errorMessage}</p>: null}
    </>:null
}


         </>
}
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

export default connect(mapStateToProps, mapDispatchToProps)(VisaStatusPage)
