import { Button, Form, InputGroup } from "react-bootstrap";
import SearchIcon from './assets/Search.svg?react';
import "./css/AdminUsers.css"

const AdminUsers = () => {
    return(<>
            <InputGroup className="mt-4 adminUserSearchBar">
                    <Form.Control
                    placeholder="Username"
                    aria-label="searchQuery"
                    />
                <Button className="button" id="button-addon2">
                    <SearchIcon className="white-icon"/>
                </Button>
            </InputGroup>

            <div className="userContainer">
                <div className="adminUserInfo">

                </div>
                <div className="adminUserAction">

                </div>
            </div>
            
    </>)
}

export default AdminUsers;