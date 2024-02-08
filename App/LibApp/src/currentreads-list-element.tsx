import { Col, Row } from "react-bootstrap";
import { CircularProgressbar, buildStyles} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { userBook } from "./wishlist";
import { useEffect, useState } from "react";
import axios from "axios";
import Checkmark from "./assets/checkmark.svg?react";
import BlurLayer from "./BlurLayer";
import FinishBook from "./FinishBook";

const CurrentReadsListElement = (props: {book : userBook, refresh : () => void}) => {

    const [pagesRead, setPagesRead] = useState(props.book.pagesRead);
    const [startDate, setStartDate] = useState(props.book.startDate.toString());
    const [dueDate, setDueDate] = useState(props.book.dueDate.toString());
    const [progress, setProgress] = useState(0);
    const [initialRender, setInitialRender] = useState(true);
    const [minimumPace, setMinimumPace] = useState(0);
    const [showFinish, setShowFinish] = useState(false);

    useEffect(() => {
        GetProgress();
    }, [])

    useEffect(() => {
        if(!initialRender)
            SaveProgress();
        else
            setInitialRender(false);
    }, [startDate, dueDate])

    const GetProgress = () =>
    {
        setProgress((pagesRead / Number(props.book.book?.pages)) * 100);

        const differenceInMilliseconds : number = new Date(dueDate).getTime() - new Date().getTime();
        const differenceInDays : number = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24)); 

        const pagesLeft = Number(props.book.book?.pages) - pagesRead;
        const pagesPerDay = pagesLeft/differenceInDays;
        setMinimumPace(Math.round(pagesPerDay))
    }

    const SaveProgress = async () =>
    {
        GetProgress();
        props.book.pagesRead = pagesRead;
        props.book.startDate = new Date(startDate);
        props.book.dueDate = new Date(dueDate);
        
        console.log(props.book);

        try{
            await axios.put(`http://localhost:5175/api/Books/UpdateUserBook?userID=${localStorage.getItem("userID")}`, props.book)
            console.log("Book updated");
        }
        catch(error)
        {
            console.log(error);
        }
    }

    const HandleMarkAsFinished = async () =>
    {
        props.book.status = "finished";
        await SaveProgress();
        setShowFinish(false);
        props.refresh();
    }

    const removeUserbook = async () => {
        
        try{
            await axios.delete(`http://localhost:5175/api/Books/DeleteUserBook?userID=${localStorage.getItem("userID")}&finna_ID=${props.book.finna_ID}`);
            console.log("Book removed from wishlist successfully");
        }
        catch(error)
        {
            console.log(error);
        }

        props.refresh();
    }

    const GetCorrectFormatDate = (date : string) =>
    {
        if(date.includes("T"))
            return(date.substring(0, date.indexOf("T")))
        else
            return(date);
    }

    return(<>
            <Row className="elementContainer mb-5">
                <Col className="col-2 elementCoverContainer">
                    <img className="elementCover" src={props.book.book?.image}></img>
                </Col>
                <Col className="col-4 elementBookDataContainer">
                    <h5 className="mb-4">{props.book.book?.title}</h5>
                    <p><span className="elementLeftText">Author:</span><span className="elementRightText">{props.book.book?.author}</span></p>
                    <p><span className="elementLeftText">Pages:</span><span className="elementRightText">{props.book.book?.pages}</span></p>
                    <p><span className="elementLeftText">ISBN:</span><span className="elementRightText">{props.book.book?.isbn}</span></p>
                    <p><span className="elementLeftText">User score:</span><span className="elementRightText">X X X X X</span></p>
                </Col>
                <Col className="col-3 elementCounterContainer">
                    <div className="barContainer">
                        <CircularProgressbar strokeWidth={4} value={progress} styles={buildStyles({
                        strokeLinecap: "butt",
                        pathColor: "#69B46E",
                        trailColor: "#0009"
                        })}/>
                    </div>
                    <div className="separator"></div>
                    <div className="progressInputs">                    
                        <Row style={{height: "100%"}}>
                            <Col className="col-6">
                                <input type="number" value={pagesRead} onChange={(e) => setPagesRead(Number(e.target.value.toString()))} className="elementInputfieldLeft" onBlur={SaveProgress}></input>
                            </Col>
                            <Col className="col-6">
                                <input type="number" defaultValue={props.book.book?.pages} disabled className="elementInputfieldRight"></input>
                            </Col>
                        </Row>
                    </div>
                    <p className="progressText">Progress</p>
                </Col>
                <Col className="col-3 elementCounterDataContainer ">
                <img src="X.png" onClick={removeUserbook} className="xBtn"></img>
                <Checkmark className="checkMark" onClick={() =>setShowFinish(true)}/>
                    <div className="separatorHor mt-2"></div>
                    <div className="dataContainer mt-2">
                        <div className="dataTop">
                            <label htmlFor="start">Start date:</label>
                            <input className="dateInput" value={GetCorrectFormatDate(startDate)} onChange={(e) => setStartDate(e.target.value)} name="start" type="date"></input>
                        </div>
                        <div className="dataTop">
                            <label htmlFor="start">Due date:</label>
                            <input className="dateInput" value={GetCorrectFormatDate(dueDate)} onChange={(e) => setDueDate(e.target.value)} name="start" type="date"></input>
                        </div>
                        <div className="dataBottom">
                            <p>Minimum pace:</p>
                            <p><span style={{color : "yellowgreen"}}>{minimumPace}</span> pages per day</p>
                        </div>
                    </div>
                </Col>
            </Row>
            {showFinish &&
            <>
                <BlurLayer/>
                <FinishBook refresh={HandleMarkAsFinished} closeWindow={() => setShowFinish(false)} book={props.book}/>
            </>
            }
    </>);
}

export default CurrentReadsListElement;