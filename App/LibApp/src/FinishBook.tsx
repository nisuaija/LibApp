import { useState } from "react";
import { Button } from "react-bootstrap";
import { userBook } from "./wishlist";

type properties =
{
    closeWindow : () => void,
    refresh : () => void,
    book : userBook
}

const FinishBook = (props: properties) => {

    const date : string = (new Date).toString();
    const [selectedDate, setSelectedDate] = useState(date);

    const handleClick = (e : React.MouseEvent<HTMLButtonElement>) =>
    {
        e.stopPropagation();
        props.book.endDate = new Date(selectedDate);
        props.refresh();
    }

    return(<>
        <div className="popup">
            <img className="x" onClick={props.closeWindow} src="X.png"></img>
            <h5 className="mt-4 titlecolor">Mark book as finished</h5>
            <label htmlFor="date">End date:</label>
            <input value={selectedDate} onChange={(e)=> setSelectedDate(e.target.value)} className="dateinput mt-2" name="date" type="date" id="date"/>
            <Button onClick={(e) => handleClick(e)} className="mt-4 btnAdd">Mark as finished</Button>
        </div>
        </>);
}

export default FinishBook;