import { useEffect, useState } from "react";
import { userBook } from "./wishlist";
import axios from "axios";
import Bookmark from "./assets/bookmark.svg?react";
import Button from "react-bootstrap/Button"

type properties =
{
    userbook : userBook,
    refresh : () => void,
    showWindow : () => void,
    setMovableBook : (book : userBook) => void
}

const GridBook = (props : properties) => {

    const [showX, setShowX] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isAvailable, setIsAvailable] = useState(props.userbook.isAvailable);

    useEffect(() => {
        setIsAvailable(props.userbook.isAvailable);
        setIsClicked(false);
    }, [props.userbook])

    const removeUserbook = async () => {
        
        try{
            await axios.delete(`http://localhost:5175/api/Books/DeleteUserBook?userID=${localStorage.getItem("userID")}&finna_ID=${props.userbook.finna_ID}`);
            console.log("Book removed from wishlist successfully");
        }
        catch(error)
        {
            console.log(error);
        }

        props.refresh();
    }

    const handleXclick = (e : React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation();
        removeUserbook();
    }

    const handleAddToCurrentReads = async (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        props.setMovableBook(props.userbook);
        props.showWindow();
    }

    return(
        <div className="col-md-auto">
                <div className={!isClicked ? "coverContainer" : "coverContainer-expanded"} onClick={() => { setIsClicked(!isClicked); setShowX(false);}} onMouseEnter={() => setShowX(true)} onMouseLeave={() => setShowX(false)} >
                    <Bookmark className={isAvailable ? "bookmark-available" : "bookmark-notAvailable"}/>
                    <img className="cover" src={props.userbook.book!.image}></img>
                    {(showX && !isClicked) &&
                    <>
                    <img onClick={(e) => handleXclick(e)} className="xButton" src="X.png"></img></>
                    }
                    {isClicked && <>
                    <div className="infoWindow">
                        <p className="title">{props.userbook.book!.title}</p>
                        <p className="leftText">Author:</p>
                        <p className="rightText">{props.userbook.book!.author}</p>
                        <p className="leftText">Pages:</p>
                        <p className="rightText">{props.userbook.book!.pages}</p>
                        <p className="leftText">ISBN:</p>
                        <p className="rightText">{props.userbook.book!.isbn}</p>
                        <p className="leftText">User score:</p>
                        <p className="rightText">X X X X X</p>
                        <Button className="AddToCurrentReads" onClick={e => handleAddToCurrentReads(e)}>Add to Current Reads</Button>
                    </div>
                    </>}           
                </div>
        </div>
    );
}

export default GridBook;