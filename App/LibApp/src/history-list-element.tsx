import { useState } from "react";
import BlurLayer from "./BlurLayer";
import { userBook } from "./wishlist";
import HistoryListElementWindow from "./history-list-element-window";
import axios from "axios";

const GetCorrectFormatDate = (date : string) =>
{
    if(date.includes("T"))
        return(date.substring(0, date.indexOf("T")))
    else
        return(date);
}



const HistoryListElement = (props: {book : userBook, refresh: () => void}) => {

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
        setOpenWindow(false);
    }

    const [openWindow, setOpenWindow] = useState(false);

    const handleClose = () =>
    {
        props.refresh();
        setOpenWindow(false);
    }

    return(<>
    <tr onClick={() => setOpenWindow(true)}>
        <td>{props.book.book?.title}</td>
        <td>{props.book.book?.author}</td>
        <td className="text-center">{props.book.book?.pages}</td>
        <td className="text-center">{GetCorrectFormatDate(props.book.endDate.toString())}</td>
        <td className="text-center">X X X X X</td>
    </tr>
    { openWindow &&
    <>
        <BlurLayer/>
        <HistoryListElementWindow removeBook={removeUserbook} convertDate={GetCorrectFormatDate} closeWindow={handleClose} book={props.book}/>
    </>
    }
    </>);
}

export default HistoryListElement;