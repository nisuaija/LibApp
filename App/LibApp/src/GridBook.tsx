import { useEffect, useState } from "react";
import { userBook } from "./wishlist";
import axios from "axios";
import Bookmark from "./assets/bookmark.svg?react";
import Button from "react-bootstrap/Button"
import Rating from "@mui/material/Rating/";
import StarIcon from "@mui/icons-material/Star"

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
    const [score, setScore] = useState(0);

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

    const GetRating = async () =>
    {
        const rating = await axios.get(`http://localhost:5175/api/Review/GetAverageScoreByBook?finna_ID=${props.userbook.finna_ID}`)
        setScore(Number(rating.data));
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
                <div className={!isClicked ? "coverContainer" : "coverContainer-expanded"} onClick={() => {GetRating(); setIsClicked(!isClicked); setShowX(false);}} onMouseEnter={() => setShowX(true)} onMouseLeave={() => setShowX(false)} >
                    <Bookmark className={isAvailable ? "bookmark-available" : "bookmark-notAvailable"}/>
                    <img className="cover" src={props.userbook.book!.image}></img>
                    {(showX && !isClicked) &&
                    <>
                    <img onClick={(e) => handleXclick(e)} className="xButton" src="X.png"></img></>
                    }
                    {isClicked && <>
                    <div className="infoWindow">
                        <p className="title">{props.userbook.book!.title}</p>
                        <p className="leftText">Author: <span className="rightText">{props.userbook.book!.author}</span></p>
                        <p className="leftText">Pages: <span className="rightText">{props.userbook.book!.pages}</span></p>
                        <p className="leftText">ISBN: <span className="rightText">{props.userbook.book!.isbn}</span></p>
                        <div className="wishlistRating">
                            <Rating readOnly name="half-rating"  value={score} precision={0.5} emptyIcon={<StarIcon style={{ fill : "black", height: "30px", width:"30px"  }} fontSize="inherit" />} icon={<StarIcon style={{fill : "white", height: "30px", width:"30px" }} fontSize="inherit" />}/>
                            <p className="showReviewsText mt-2">Show reviews</p>
                        </div>
                        <Button className="AddToCurrentReads" onClick={e => handleAddToCurrentReads(e)}>Add to Current Reads</Button>
                    </div>
                    </>}           
                </div>
        </div>
    );
}

export default GridBook;