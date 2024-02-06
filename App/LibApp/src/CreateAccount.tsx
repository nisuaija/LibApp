import { FormEvent, useState } from "react";
import AccountCircle from "./assets/accountCircle.svg?react";
import Button from "react-bootstrap/Button";
import "./css/CreateAccount.css";
import axios, { AxiosError } from "axios";

const CreateAccount = (props: {login : () => void}) => {

    const [username, SetUsername] = useState("");
    const [password, SetPassword] = useState("");
    const [passwordConf, SetPasswordConf] = useState("");
    const [errorMessage, SetErrorMessage] = useState("");

    const TryCreate = async (event : FormEvent) =>
    {
        event.preventDefault();

        if(username === "" || password === "" || passwordConf === "")
        {
            SetErrorMessage("Missing input");
            return;
        }

        if(passwordConf != password)
        {
            SetErrorMessage("Passwords do not match");
            return;
        }

        try
        {
                await axios.post(`http://localhost:5175/api/User/CreateAccount?username=${username}&password=${password}`)
                console.log("Account created");
                props.login();
        }
        catch(error)
        {
            const errorMessage = (error as AxiosError)?.response?.data;
            if(typeof errorMessage === "string")
                SetErrorMessage(errorMessage);
            else
                SetErrorMessage("Login failed");
            console.log(error);
        }
    }

    return(<>
     <div className="login">
            <div className="loginText">
                <AccountCircle className="accountSVG"/>
                { errorMessage != "" &&
                <p style={{color: "#b92e2e"}}>Error: {errorMessage}</p>
                }
                <form autoComplete="off" onSubmit={TryCreate}>
                <div className="inputGroup">
                    <label className="label mb-2" htmlFor="username">Username</label>
                    <input value={username} onChange={(e) => SetUsername(e.target.value)} name="username" type="text" className="inputField"/>
                </div>
                <div className="inputGroup"> 
                    <label className="label mb-2 mt-4" htmlFor="password">Password</label>
                    <input value={password} onChange={(e) => SetPassword(e.target.value)} name="password" type="password" className="inputField"/>
                </div>
                <div className="inputGroup"> 
                    <label className="label mb-2 mt-4" htmlFor="passwordconfirm">Confirm Password</label>
                    <input value={passwordConf} onChange={(e) => SetPasswordConf(e.target.value)} name="passwordconfirm" type="password" className="inputField"/>
                </div>
                <Button type="submit" className="buttonLogIn mt-4">Sign Up</Button>
                </form>             
                <p onClick={props.login} className="signInButton"><u>Login</u></p>
            </div>
        </div>
    </>)
}

export default CreateAccount;