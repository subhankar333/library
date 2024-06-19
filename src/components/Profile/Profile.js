import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg_img from '../Home/Images/library2.png'
import axios from "axios";
import './Profile.css'

export default function Profile()
{
    var [username, setUsername] = useState("");
    var [password, setPassword] = useState("");
    var [confirmPassword, setConfirmPassword] = useState("");
    var [name, setName] = useState("");
    var [email, setEmail] = useState("");
    var [isAdmin, setIsAdmin] = useState("");
    var [currUser, setCurrUser] = useState([]);

    var navigate = useNavigate();

    var userId = JSON.parse(sessionStorage.getItem("userId"));

    console.log(sessionStorage);

    useEffect(()=>{
            axios.get(`https://localhost:7068/api/Users/GetUser/userId?userId=${userId}`)
            .then(function(res){
                console.log(res.data);
                setCurrUser(res.data);
                setUsername(res.data.username)
                setEmail(res.data.email);
                setPassword(res.data.password);
            })
            .catch(function(err){
                console.log(err);
            })
    },[username])


    var user = {};

    function handleProfile(e)
    {
        e.preventDefault();
        user.username = username;
        user.email = email;
        user.userId = userId;
        user.password = password;
        var RequestOption = {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(user)
          }
      
          fetch("https://localhost:7068/api/Users", RequestOption)
          .then(res => res.json())
          .then(res => {
            console.log(res)
            alert("Profile updated successfully")
          })
          .catch(err => {
            console.log(err)
            alert("Error updating profile")
          })
    }

    function handleBack()
    {
        navigate('/') 
    }


    return(
        <div id="profile-page">
            <img src={bg_img} className="img-bg"/> 
            <div className="form-container">
                <h2>Profile</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    
                    <button type="submit" onClick={handleProfile}>Save</button>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <button type="submit" className="back-btn" onClick={handleBack}>Back</button>
                    {/* <br/> <br/>
                    <p>Already a User, Go to <span className="l-text" onClick={()=>navigate('/login')}>Save</span> </p> */}
                </form>
            </div>
        </div>
    )
}