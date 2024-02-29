import { Button } from "react-bootstrap";
import "./css/report.css"
import axios from "axios";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const Report = (props: {closeWindow : () => void, reviewID : string}) => {

    type Report =
    {
        ID : string,
        Reason : string,
        Info : string
    }

    const [reason, setReason] = useState("Inappropriate content");
    const [text, setText] = useState("");

    const sendReport = async () => {

        const r : Report = {ID: uuidv4(), Reason: reason, Info: text};
        
        try {
            await axios.post(`http://localhost:5175/api/Review/PostReport?reviewID=${props.reviewID}`, r);
        }catch(error)
        {
            console.error(error);
        }

        props.closeWindow();
    }

    return(
        <>
        <div className="blurReport"></div>
        <div className="ReportWindow">
            <img src="X.png" onClick={props.closeWindow} className="reportX"></img>
            <div className="reportTop"><h5>Create Report</h5></div>
            <div className="reportReason">
                <label htmlFor="reasons">Reason: </label>
                <select value={reason} onChange={(e) => setReason(e.target.value)} name="reasons" id="reasons">
                    <option value="Inappropriate content">Inappropriate content</option>
                    <option value="Spam or self-promotion">Spam or self-promotion</option>
                    <option value="Spoilers">Spoilers</option>
                    <option value="Fake or fradulent review">Fake or fradulent review</option>
                    <option value="Misinformation">Misinformation</option>
                    <option value="Harrassment">Harrassment</option>
                </select>
            </div>
            <div className="reportTextbox">
                    <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="More information...">      
                    </textarea>
            </div>
            <div className="reportLow">
            <Button onClick={sendReport}>Send Report</Button>
            </div>         
        </div>
        
        </>
    )
}

export default Report;