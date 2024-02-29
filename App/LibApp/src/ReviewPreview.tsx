import "./css/ReviewPreview.css";
import Rating from "@mui/material/Rating/";
import StarIcon from "@mui/icons-material/Star";
import ReviewFull from "./ReviewFull";
import { useEffect, useState } from "react";
import BlurLayer from "./BlurLayer";
import { userBook } from "./wishlist";


const GetCorrectFormatDate = (date : string) =>
{
    if(date.includes("T"))
        return(date.substring(0, date.indexOf("T")))
    else
        return(date);
}

export type Review =
{
    reviewID : string,
    score : number,
    userName : string,
    text : string,
    dateTime : Date
}

const ReviewPreview = (props : {closeWindow : () => void, review : Review | null, book : userBook | null, fullReviewCallback : () => void, isAdmin : boolean}) =>
{
    const [showFullReview, setShowFullReview] = useState(false);

    useEffect(() => {
        console.log(props.review);
        // eslint-disable-next-line
    }, []);

    return(
        <>
        {props.review != null && <> 
        <div className="previewBlock">
            <div className="previewUpperBlock">
                <img src="avatar.png" className="avatar"></img>
                <Rating className="rating" readOnly name="half-rating"  value={props.review.score} precision={0.5} emptyIcon={<StarIcon style={{ fill : "black", height: "35px", width:"35px"  }} fontSize="inherit" />} icon={<StarIcon style={{fill : "#5B7B82", height: "35px", width:"35px" }} fontSize="inherit" />}/>
                <p className="reviewUsername">{props.review.userName}</p>
            </div>
            <div className="previewTextBlock">
                <p>{props.review.text}</p>
            </div>
            <div className="previewBottomBlock">
                <p onClick={() =>{ setShowFullReview(true); props.fullReviewCallback();}} className="previewLeftText">Show more</p>
                <p className="previewRightText">{GetCorrectFormatDate(props.review.dateTime.toString())}</p>
            </div>
        </div>
        {
            showFullReview && 
            <>
                <BlurLayer/>
                <ReviewFull isAdmin={props.isAdmin} getReview={props.review} isEditable={props.book !== null ? true : false} fromGrid={props.book === null ? true : false} book={props.book} closeWindow={() => {setShowFullReview(false); props.closeWindow(); props.fullReviewCallback();}}/>
            </>
        }
        </>
        }
        </>
    )
}

export default ReviewPreview;