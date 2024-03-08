import { Button, Form, InputGroup } from "react-bootstrap";
import SearchIcon from './assets/Search.svg?react';
import "./css/AdminUsers.css"
import { FormEvent, useState } from "react";
import axios from "axios";

type user =
{
    userID : string,
    isAdmin : boolean,
    userName : string
}

const AdminUsers = () => {

    const [users, setUsers] = useState<user[]>([]);
    const [query, setQuery] = useState("");

    const searchUsers = async () => {
        try{
            const res = await axios.get(`http://localhost:5175/api/User/GetUsersBySearch?query=${query}`);
            const sortedUsers = res.data.sort((a : user, b : user) => a.userName.localeCompare(b.userName));
            setUsers(sortedUsers);
        } catch (error) {
            console.log(error);
        }
    }

    const confirm = async (forminfo : FormEvent<HTMLFormElement>) =>
    {
        forminfo.preventDefault();
        const formData = new FormData(forminfo.currentTarget);
        const action = formData.get("userAction");

        if(action === "AssignUser")
        {
            try {
                await axios.put(`http://localhost:5175/api/User/SetRole?makeAdmin=${false}&userID=${formData.get("userID")}`);
                console.log("user role switched to user");
                searchUsers();
            } catch (error)
            {
                console.log(error);
            }
        }
        else if(action === "AssignAdmin")
        {
            try {
                await axios.put(`http://localhost:5175/api/User/SetRole?makeAdmin=${true}&userID=${formData.get("userID")}`);
                console.log("user role switched to admin");
                searchUsers();
            } catch (error)
            {
                console.log(error);
            }
        }
        else if(action === "RemoveUser")
        {
            try {
                await axios.delete(`http://localhost:5175/api/User/Delete User?userID=${formData.get("userID")}`);
                console.log("user deleted");
                searchUsers();
            } catch (error)
            {
                console.log(error);
            }
        }

        console.log(formData.get("userID"));
    }

    return(<>
            <InputGroup className="mt-4 adminUserSearchBar">
                    <Form.Control onChange={(e) => setQuery(e.target.value)} value={query}
                    placeholder="Username"
                    aria-label="searchQuery"
                    />
                <Button className="button" id="button-addon2" onClick={searchUsers}>
                    <SearchIcon className="white-icon"/>
                </Button>
            </InputGroup>

            {
                users.map(u =>{
                    return(
                    <form onSubmit={(e) => confirm(e)}>
                        <div className="userContainer">
                            <div className="adminUserInfo">
                                <img src="avatar.png" className="adminUserAvatar"></img>
                                <div className="userNames">
                                    <p><span style={{fontSize: "20px"}}>{u.userName}</span></p>
                                    <p><span style={{color: "gray"}}>{u.isAdmin ? "admin" : "user"}</span></p>
                                    <div className="userSeparator"></div>
                                </div>
                            </div>
                            <div className="adminUserAction">
                                <label htmlFor="userAction">Action: </label>
                                <select className="reportDropdown" name="userAction" id="userAction">
                                        <option value="AssignUser">Assign user role</option>
                                        <option value="AssignAdmin">Assign admin role</option>
                                        <option value="RemoveUser">Remove user</option>
                                </select>
                                <input type="hidden" name="userID" value={u.userID}></input>
                                <Button type="submit" className="resolveBtn">Confirm</Button>
                            </div>
                        </div>         
                    </form>
                    );
                })
            }       
    </>)
}

export default AdminUsers;