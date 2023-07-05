import React from "react";
import {useForm} from "react-hook-form"
import axios from "axios"

interface Props{
    [key: string]: any;
  }

function SendEmail(props: Props){

    const { register, handleSubmit, watch, setValue, formState: { errors }, control } = useForm({
        defaultValues: {

            email: ""
        }})

    const onSubmit = async (data: any) => {
        console.log(data)
        axios.post("/user/hr/sendEmail", data)
        .then((res) => {console.log(res.data)})
    }

    return(
    <>
    <form onSubmit={handleSubmit(onSubmit)}>

    <label htmlFor="">Email to send to</label>
    <input {...register("email")} type="text"/>
    <input type="submit" />

    </form>
    
    
    
    </>)
}

export default SendEmail