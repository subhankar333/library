import React from "react";
import bg_img from './Images/library2.png'
import './Home.css'


export default function HomeComponent(){

    var username = (sessionStorage.getItem("username"));

    return(
        <div className="home">
            <img src={bg_img} className="img-bg"/> 
            <div className="home-content">
                    {username && <p>Hello <b>{username}</b></p>}
                    <h2>Happy to see you back, Explore more...</h2>
            </div>
        </div>
    )
}