import AccountCircle from "./assets/accountCircle.svg?react";
import Button from "react-bootstrap/Button";
import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
const Login = (props: {checkToken : () => void}) => {

    const [username, SetUsername] = useState("");
    const [password, SetPassword] = useState("");
    const [errorMessage, SetErrorMessage] = useState("");

    const TryLogIn = async (event : FormEvent) =>
    {
        event.preventDefault();

        try{
            const res = await axios.get(`http://localhost:5175/api/User/Login?username=${username}&password=${password}`)
            const token = res.data;
            localStorage.setItem('token', token);
            props.checkToken();
            window.location.href = '/';

            try{
                const userData = await axios.get(`http://localhost:5175/api/User/GetUserDataFromSession?sessionToken=${token}`)
                localStorage.setItem('username', userData.data.userName);
                localStorage.setItem('isAdmin', userData.data.isAdmin);
                localStorage.setItem('userID', userData.data.userID);
            }
            catch(error)
            {
                console.log(error);
            }
        }
        catch (error)
        {
            const errorMessage = (error as AxiosError)?.response?.data;
            if(typeof errorMessage === "string")
                SetErrorMessage(errorMessage);
            else
                SetErrorMessage("Login failed");
            console.log(error);
        }     
    }


    return (
        <>
        <div className="login">
            <div className="loginText">
                <AccountCircle className="accountSVG"/>
                { errorMessage != "" &&
                <p style={{color: "#b92e2e"}}>Error: {errorMessage}</p>
                }
                <form autoComplete="off" onSubmit={TryLogIn}>
                <div className="inputGroup">
                    <label className="label mb-2" htmlFor="username">Username</label>
                    <input value={username} onChange={(e) => SetUsername(e.target.value)} name="username" type="text" className="inputField"/>
                </div>
                <div className="inputGroup"> 
                    <label className="label mb-2 mt-4" htmlFor="password">Password</label>
                    <input value={password} onChange={(e) => SetPassword(e.target.value)} name="password" type="password" className="inputField"/>
                </div>
                </form>
                <Button type="submit" onClick={TryLogIn} className="buttonLogIn mt-4">Login</Button>
                <p><a href="">Sign up</a></p>
            </div>
        </div>
        </>
    )
}

export default Login;