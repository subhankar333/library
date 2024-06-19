import React, {useState} from "react";
import './Register.css'
import bg_img from '../Home/Images/library2.png'
import { Navigate, useNavigate } from "react-router-dom";

export default function Register(){

    var [username, setUsername] = useState("");
    var [password, setPassword] = useState("");
    var [confirmPassword, setConfirmPassword] = useState("");
    var [email, setEmail] = useState("");

    const [userNameError, setUserNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isbnError, setIsbnError] = useState("");
    const [confrimPasswordErrornreError, setConfrimPasswordErrornreError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [missError, setMissError] = useState("");
    const [validEmailError, setValidEmailError] = useState("");
   

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
      
          if (!confirmPassword) {
             setConfrimPasswordErrornreError("Confirm Password is required");
            isValid = false;
          }else{
            setConfrimPasswordErrornreError("");
          }
      
          if (!email) {
            setEmailError("Email is required");
            isValid = false;
          }else{
            setEmailError("");
          }

          if (password !== confirmPassword) {
            setMissError("Passwords are not matching");
            isValid = false;
          }else{
            setMissError("");
          }

          if (!email.includes('@')) {
            setValidEmailError("Please enter valid email");
            isValid = false;
          }else{
            setValidEmailError("");
          }
      
    
        return isValid;
      };


    var user = {};

    function register(e)
    {
        e.preventDefault();

        var isValid = validateForm();

        if(isValid)
        {
            user.username = username;
            user.password = password;
            user.email = email;
            

            var RequestOption = {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(user)
            }
        
            fetch("https://localhost:7068/api/Users/AddUser", RequestOption)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                alert("User registered successfully")
                navigate('/login')
            })
            .catch(err => {
                console.log(err)
                alert("User already exists")
            })
        }

        
    }
   

    return(
        <div className="register-page">
            <img src={bg_img} className="img-bg"/> 
            <div className="form-container">
                <h2>Register</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    {userNameError && <p className="error">{userNameError}</p>}
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {passwordError && <p className="error">{passwordError}</p>}
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    {confrimPasswordErrornreError && <p className="error">{confrimPasswordErrornreError}</p>}
                    {missError && <p className="error">{missError}</p>}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    {emailError && <p className="error">{emailError}</p>}
                    {(!emailError && validEmailError) && <p className="error">{validEmailError}</p>}
                    <button type="submit" onClick={register}>Register</button>
                    <br/> <br/>
                    <p>Existing User, Click here to <span className="l-text" onClick={()=>navigate('/login')}>Login</span> </p>
                </form>
            </div>
        </div>
    )
}