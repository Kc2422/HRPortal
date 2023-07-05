import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


export default function Register(){
    
    const {tokenId} = useParams()
    const navigate  = useNavigate();
    useEffect(() => {
        axios.get("/user/getToken/"+tokenId)
        .then(data => {
            console.log(data)
            if(data.statusText !== "OK"){
                navigate("/")
            }
        })
    })

    const [user, setUser] = useState({
        name: '',
        password: '',
        email: '',
        isAdmin: false,
        applicationStatus:'not submitted'
    });
    
    const updateUser = (field:any) => (e:any) => {
        setUser((prevState) => ({ ...prevState, [field]: e.target.value }));
    }

  const onSubmit = (e: any) => {
    e.preventDefault();
    // register the user url might changed
    var url1 = "http://localhost:3001/user/signup/";
    var fetchInfo = fetch(url1, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.result) {
          alert("User is existed!");
        } else {
          navigate("/");
        }
      })
      .catch((error) => console.log("Error: ", error));
    // assign a house
    // add the user to one of the houseSchema's resident list
    console.log("randomly assign a house to the user");
    var url2 = "http://localhost:3001/house/assign";
    var fetchInfo = fetch(url2, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isRandom: true,
        user: {
          name: user.name,
          email: user.email,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          alert("request is not send out successfully");
        }
      })
      .catch((error) => console.log("Error: ", error));

    /*setUser({
            name: '',
            password: '',
            email: '',
        });*/
  };

  return (
    <div id="registerForm">
      This is the register page.
      <div id="register-name">
        <label>User name:</label>
        <input
          placeholder="name"
          value={user.name}
          onChange={updateUser("name")}
          required></input>
      </div>
      <div id="register-email">
        <label>Email:</label>
        <input
          placeholder="Email"
          value={user.email}
          onChange={updateUser("email")}
          required></input>
      </div>
      <div id="register-password">
        <label>Password:</label>
        <input
          placeholder="Password"
          value={user.password}
          onChange={updateUser("password")}
          required></input>
      </div>
      <div>
        {user.name}
        {user.email}
        {user.password}
      </div>
      <div>
        <button onClick={onSubmit} type="submit">
          submit
        </button>
      </div>
    </div>
  );
}
