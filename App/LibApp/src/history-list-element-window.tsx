import { InputGroup } from "react-bootstrap";
import "./css/history-list-element-window.css"
import { userBook } from "./wishlist";
import { useEffect, useState } from "react";
import axios from "axios";

type properties =
{
    closeWindow : () => void,
    book : userBook,
    convertDate : (input : string) => string,
    removeBook : () => void
}

const HistoryListElementWindow = (props : properties) =>
{
    const [startDate, setStartDate] = useState(props.book.startDate.toString());
    const [endDate, setEndDate] = useState(props.book.endDate.toString());
    const [initialRender, setInitialRender] = useState(true);
    const [inDays, setInDays] = useState(0);
    const [pace, setPace] = useState(0);

    useEffect(() => {
        if(!initialRender)
            SaveProgress();
        else
            setInitialRender(false);

        UpdateStats();
    }, [startDate, endDate])

    const SaveProgress = async () =>
    {
        props.book.startDate = new Date(startDate);
        props.book.endDate = new Date(endDate);
        
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

    const UpdateStats = () => {
        //Count days
        const differenceInMilliseconds : number = new Date(endDate).getTime() - new Date(startDate).getTime();
        const differenceInDays : number = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));

        setInDays(differenceInDays);

        //Calculate pace
        const _pace : number = Number(props.book.book?.pages) / differenceInDays;
        setPace(_pace);
    }

    return(<>
        <div className="upperBlock">
            <div className="leftBlock">
                <div className="historyDataContainer">
                    <h5 className="mb-4">{props.book.book?.title}</h5>
                    <p><span className="historyElementLeftText">Author:</span><span className="elementRightText">{props.book.book?.author}</span></p>
                    <p><span className="historyElementLeftText">Pages:</span><span className="elementRightText">{props.book.book?.pages}</span></p>
                    <p><span className="historyElementLeftText">ISBN:</span><span className="elementRightText">{props.book.book?.isbn}</span></p>
                    <p><span className="historyElementLeftText">User score:</span><span className="elementRightText">X X X X X</span></p>
                </div>
                <div className="historyCoverContainer">
                    <img className="historyCover" src={props.book.book?.image}></img>
                </div>
            </div>
            <div className="rightBlock">
                <img src="X.png" onClick={props.closeWindow} className="x"></img>
                <p>No review found</p>
            </div>
        </div>
        <div className="lowerBlock">
            <div className="datesContainer">
                <InputGroup>
                    <label htmlFor="startDate">Start date</label>
                    <input name="startDate" type="date" value={props.convertDate(startDate)} onChange={(e) => setStartDate(e.target.value)}></input>
                </InputGroup>
                <InputGroup>
                    <label htmlFor="endDate">End date</label>
                    <input name="endDate" type="date" value={props.convertDate(endDate)} onChange={(e) => setEndDate(e.target.value)}></input>
                </InputGroup>
                <p className="removeBTN" onClick={props.removeBook}><u>Remove book</u></p>
            </div>
            <div className="paceContainer">
            <div className="historySeparator"></div>
                <p>You finished this book in <span style={{color : "yellowgreen"}}>{inDays}</span> days!</p>
                <p>You phased thourgh the book in pace of <span style={{color : "yellowgreen"}}>{Math.round(pace)}</span> pages per day!</p>
            </div>
        </div>
        
    </>)
}

export default HistoryListElementWindow;