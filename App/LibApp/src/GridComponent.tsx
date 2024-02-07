import "./css/GridComponent.css"
import { userBook } from "./wishlist";
import GridBook from "./GridBook";
import AddCurrentReads from "./AddCurrentReads";
import { useState } from "react";
import BlurLayer from "./BlurLayer";
import axios from "axios";

const GridComponent = (props: {books: userBook[], refresh: () => void}) => {

    const emptyBook : userBook = {
        ID: '',
        finna_ID: '',
        dueDate: new Date(),
        startDate: new Date(),
        endDate: new Date(),
        pagesRead: 0,
        status: '',
        isAvailable: false,
        book: null
    }

    const [showAddPopUp, setShowAddPopUp] = useState(false);
    const [userBookToMoved, setUserBookToMoved] = useState(emptyBook);

    const AddBook = async (date : Date) =>{
        //Moves book to Current Reads
        userBookToMoved.dueDate = date;
        userBookToMoved.startDate = new Date;
        userBookToMoved.status = "current";

        try{
            await axios.put(`http://localhost:5175/api/Books/UpdateUserBook?userID=${localStorage.getItem("userID")}`, userBookToMoved)
            console.log("Book moved to currents");
        }
        catch(error)
        {
            console.log(error);
        }

        setShowAddPopUp(false);
        props.refresh();
    }

    return(<>  
        <div className="row grid">
            {props.books.map((e, index)=> {
                return(<GridBook showWindow={()=>setShowAddPopUp(true)} setMovableBook={setUserBookToMoved} refresh={props.refresh} userbook={e} key={index} />);
            })}      
        </div>
        {showAddPopUp &&
        <>
            <BlurLayer/>
            <AddCurrentReads AddBook={AddBook} closeWindow={()=>setShowAddPopUp(false)}/>
        </>
        }
    </>);
}

export default GridComponent;