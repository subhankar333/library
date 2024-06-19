import React,{useState} from "react";
import './Login.css'
import bg_img from '../Home/Images/library2.png'
import { useNavigate } from "react-router-dom";

export default function Login(){

    var [username, setUsername] = useState("");
    var [password, setPassword] = useState("");
    var [loginUser,setLoginUser] = useState({})

    const [userNameError, setUserNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    
    var navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;

    
        if (!username) {
          setUserNameError("Username is required");
          isValid = false;
        } else {
          setUserNameError("");
        }

        if (!password) {
            setPasswordError("Password is required");
            isValid = false;
          }else{
            setPasswordError("");
          }
      
        return isValid;
      };


    var user = {};

    function login(e)
    {
        e.preventDefault();

        var isValid = validateForm();

        if(isValid)
        {
            user.username = username;
            user.password = password;
    
            var RequestOption = {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(user)
              }
    
              const params = new URLSearchParams({
                username: username,
                password : password
              });
          
              fetch(`https://localhost:7068/api/Users/Login?${params.toString()}`,
              RequestOption)
              .then(res => res.json())
              .then(res => {
                console.log(res)
                sessionStorage.setItem("username", res.username);
                sessionStorage.setItem("userId", res.userId);
                alert("Login Success 👏 " + res.username)
                navigate('/')
              })
              .catch(err => {
                console.log(err)
                alert("Invalid credentials")
              })
        }
       
    }

    return(
        <div className="login-page">
            <img src={bg_img} className="img-bg"/> 
            <div className="form-container-login">
                <h2>Login</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" onClick={login}>Login</button>
                    <br/> <br/>
                    <p>New to Book49,  <span className="l-text" onClick={()=>navigate('/register')}>Register</span> here </p>
                </form>
            </div>
        </div>
    )
}