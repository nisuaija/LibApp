import "./css/ReviewPreview.css";
import Rating from "@mui/material/Rating/";
import StarIcon from "@mui/icons-material/Star";
import ReviewFull from "./ReviewFull";
import { useState } from "react";
import BlurLayer from "./BlurLayer";
import { userBook } from "./wishlist";

const GetCorrectFormatDate = (date : string) =>
{
    if(date.includes("T"))
        return(date.substring(0, date.indexOf("T")))
    else
        return(date);
}

const ReviewPreview = (props : {book : userBook}) =>
{
    const [showFullReview, setShowFullReview] = useState(false);

    return(
        <>
        {props.book.review != null && <> 
        <div className="previewBlock">
            <div className="previewUpperBlock">
                <img src="avatar.png" className="avatar"></img>
                <Rating className="rating" readOnly name="half-rating"  value={props.book.review?.score} precision={0.5} emptyIcon={<StarIcon style={{ fill : "black", height: "35px", width:"35px"  }} fontSize="inherit" />} icon={<StarIcon style={{fill : "#5B7B82", height: "35px", width:"35px" }} fontSize="inherit" />}/>
                <p className="reviewUsername">{props.book.review?.userName}</p>
            </div>
            <div className="previewTextBlock">
                <p>{props.book.review?.text}</p>
            </div>
            <div className="previewBottomBlock">
                <p onClick={() => setShowFullReview(true)} className="previewLeftText">Show more</p>
                <p className="previewRightText">{GetCorrectFormatDate(props.book.review?.dateTime.toString())}</p>
            </div>
        </div>
        {
            showFullReview && 
            <>
                <BlurLayer/>
                <ReviewFull isEditable={true} book={props.book} closeWindow={() => setShowFullReview(false)}/>
            </>
        }
        </>
        }
        </>
    )
}

export default ReviewPreview;