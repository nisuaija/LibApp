import "./css/ReviewFull.css"
import Rating from "@mui/material/Rating/";
import StarIcon from "@mui/icons-material/Star";
import FlagIcon from "./assets/flag.svg?react";
import { userBook } from "./wishlist";
import EditIcon from "./assets/EditIcon.svg?react";
import { useState } from "react";
import BlurLayer from "./BlurLayer";
import AddReview from "./AddReview";
import axios from "axios";

const GetCorrectFormatDate = (date : string) =>
{
    if(date.includes("T"))
        return(date.substring(0, date.indexOf("T")))
    else
        return(date);
}


const ReviewFull = (props : {closeWindow : () => void, book : userBook, isEditable : boolean}) =>
{

    const [showEdit, setShowEdit] = useState(false);

    
    const RemoveReview = async() =>
    {
        try{
            await axios.delete(`http://localhost:5175/api/Review/DeleteReview?userID=${localStorage.getItem("userID")}&finna_ID=${props.book.finna_ID}`);
            props.book.review = null;
            console.log("Review deleted");
            props.closeWindow();
        }
        catch(error)
        {
            console.log(error);
        }
    }

    return(<>
        <div className="fullReview">
        <img src="X.png" onClick={props.closeWindow} className="x xPos"></img>
            <div className="fullReviewUpperBlock">
                <div className="fullReport">
                    <FlagIcon className="flagIcon"/>
                    <p>Report</p>
                </div>
                <div className="fullReviewAccountBlock">
                    <img src="avatar.png" className="avatar avatarFull"></img>
                    <Rating className="rating ratingFull" readOnly name="half-rating"  value={props.book.review?.score} precision={0.5} emptyIcon={<StarIcon style={{ fill : "black", height: "35px", width:"35px"  }} fontSize="inherit" />} icon={<StarIcon style={{fill : "#5B7B82", height: "35px", width:"35px" }} fontSize="inherit" />}/>
                    <p className="fullReviewUsername">{props.book.review?.userName}</p>
                </div>
            </div>
            <div className="fullReviewTextBlock">
                <textarea disabled value={props.book.review?.text}></textarea>
            </div>
            <div className="fullReviewFooterBlock">
                <p onClick={props.closeWindow} className="fullLeftText">Close</p>
                <p className="fullRightText">{// @ts-expect-error: Is not undefined
                    GetCorrectFormatDate(props.book.review?.dateTime.toString())}</p>
                {props.isEditable &&
                <>
                <div className="fullEdit" onClick={() => setShowEdit(true)}>
                    <EditIcon className="editIcon"/>
                    <p>Edit</p>
                </div>
                    <p onClick={RemoveReview} className="removeReview"><u>Remove review</u></p>
                </>
                }
            </div>
            {showEdit &&
            <div className="reviewEdit">
                <BlurLayer/>
                <AddReview isEdit={true} text="Change of mind? Your feedback helps fellow readers to discover great stories." book={props.book} closeWindow={() => setShowEdit(false)}/>
            </div>
            }
        </div>
        
    </>);
}

export default ReviewFull;