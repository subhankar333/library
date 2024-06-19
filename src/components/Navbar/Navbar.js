import React from "react";
import './Navbar.css';
import { Link, json, useNavigate } from "react-router-dom";


export default function Navbar(){

    const navigate = useNavigate();
    var username = (sessionStorage.getItem("username"));

    function logout(){
        var confirmed = window.confirm("Are you sure you want to log out?");
        if(confirmed)
        {
            sessionStorage.clear();
            window.location.reload();
        }
    }

    return(
        <nav className="navbar">
            <ul>
                <li><Link to='/' className="nav-link"><b id="main-nav">Book49</b></Link></li>
                
                {username && <li><Link to='user/add-book' className="nav-link">Add Book</Link></li>}
                {username && <li><Link to='user/get-books' className="nav-link">Get Books</Link></li>}
                {username && <li><Link to='user/profile' className="nav-link">Profile</Link></li>}
                {username && <button className="nav-link" id="log-icon" onClick={logout} >Logout</button>}
                

                {/* {username == undefined && <div className="user-control">
                    <button className="nav-link" id="log-icon2"><Link to='/register' className="nav-link" >Register</Link></button>
                    <button className="nav-link" id="log-icon3"><Link to='/login' className="nav-link">Login</Link></button>
                </div>} */}


                {username == undefined && 
                    <button className="nav-link" id="log-icon2"><Link to='/register' className="nav-link" >Register</Link></button>
                } 

                &nbsp; &nbsp;
                {username == undefined && 
                    <button className="nav-link" id="log-icon3"><Link to='/login' className="nav-link">Login</Link></button>
                }     
                
            </ul>
        </nav>
    );
}
