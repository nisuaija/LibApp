import "./css/App.css";
import "./css/AdminTools.css"
import { useState } from "react";
import AdminReports from "./AdminReports";
import AdminUsers from "./AdminUsers";

const AdminTools = () => {

    const [userMenu, setUserMenu] = useState(false);

    return (
        <>
        <div className="header">
            Admin Tools
        </div>
        <div className="content-page">
            <div className="adminSelector">
                <div onClick={() => setUserMenu(false)} className={userMenu ? "reportsSelect" : "reportsSelect adminSelected"}> <h4>Reports</h4> </div>
                <div onClick={() => setUserMenu(true)}  className={userMenu ? "usersSelect adminSelected" : "usersSelect"}><h4>Users</h4> </div>
            </div>
            <div className="adminSeparator"></div>
            <div className="adminContent">
                {userMenu ? 
                <AdminUsers/>
                :
                <AdminReports/>
                }
            </div>
        </div>
        </>
    )
}

export default AdminTools;