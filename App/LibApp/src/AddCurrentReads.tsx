import { useState } from "react";
import "./css/AddCurrentReads.css"
import { Button } from "react-bootstrap";

const AddCurrentReads = (props: {closeWindow : () => void, AddBook : (date : Date) => void}) => {

    const date : string = (new Date).toString();
    const [selectedDate, setSelectedDate] = useState(date);

    const handleClick = (e : React.MouseEvent<HTMLButtonElement>) =>
    {
        e.stopPropagation();
        props.AddBook(new Date(selectedDate));
    }

    return(<>
        <div className="popup">
            <img className="x" onClick={props.closeWindow} src="X.png"></img>
            <h5 className="mt-4 titlecolor">Add to Current Reads</h5>
            <label htmlFor="date">Due date:</label>
            <input value={selectedDate} onChange={(e)=> setSelectedDate(e.target.value)} className="dateinput mt-2" name="date" type="date" id="date"/>
            <Button onClick={(e) => handleClick(e)} className="mt-4 btnAdd">Add to Current Reads</Button>
        </div>
        </>);
}

export default AddCurrentReads;