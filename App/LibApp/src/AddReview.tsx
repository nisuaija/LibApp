import Rating from "@mui/material/Rating/";
import BlurLayer from "./BlurLayer";
import "./css/AddReview.css"
import StarIcon from "@mui/icons-material/Star"
import Button from "react-bootstrap/Button"
import { useEffect, useState } from "react";
import axios from "axios";
import { userBook } from "./wishlist";
import { v4 as uuidv4 } from 'uuid';

export interface Review
{
    reviewID : string,
    userName : string,
    userID : string,
    finna_ID : string,
    text : string,
    score : number,
    reports : null,
    isPrivate : boolean,
    dateTime : Date
}

const AddReview = (props : {text : string, book : userBook, closeWindow : () => void, isEdit : boolean}) => {

    const [text, setText] = useState("");
    const [rating, setRating] = useState(2.5);
    const [isPrivate, setIsPrivate] = useState(false);
    const review : Review = {
        reviewID : "Default",
        userName : "Default",
        userID : "Default",
        finna_ID : "Default",
        text : "Default",
        score : 2.5,
        reports : null,
        isPrivate : false,
        dateTime : new Date
    }

    //Post review
    const PostReview = async() =>
    {
        try {
            review.reviewID = uuidv4();
            const _userID = localStorage.getItem("userID");
            const _username = localStorage.getItem("username");

            if(_userID != null && _username != null)
            {
                review.userID = _userID;
                review.userName = _username;
            }

            review.finna_ID = props.book.finna_ID;
            review.text = text;
            review.score = rating;
            review.isPrivate = isPrivate;
            
            await axios.post("http://localhost:5175/api/Review/PostReview", review)
            console.log("Review posted successfully");          
        }
        catch (error)
        {
            console.log(error);
        }

        if(props.isEdit)
            EditAndCloseWindow();
        else
            CloseWindow();
    }

    const CloseWindow = () =>
    {
        props.closeWindow();
    }

    const EditAndCloseWindow = () =>
    {
        if(props.book.review == null)
        {
            console.log("Error: AddReview 80.");
            return;
        }

        props.book.review.score = rating;
        props.book.review.text = text;

        props.closeWindow();
    }

    useEffect(() => {
        if(props.isEdit && props.book.review?.text)
        {
            setText(props.book.review?.text);
            setRating(props.book.review?.score);
        }
        // eslint-disable-next-line
    }, [])

    return (<>
        <BlurLayer/>
        <div className="reviewContainer">
            <div className="reviewPopUp">
                <img onClick={CloseWindow} src="X.png" className="X"></img>
                <div className="titleContainer">
                    <p>{props.text}</p>
                </div>
                <div className="textboxContainer">
                    <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Your review here...">      
                    </textarea>
                </div>
                <div className="privateContainer">
                    <input onChange={(e) => setIsPrivate(e.target.checked)} name="check" type="checkbox"></input>
                    <label htmlFor="check">Private</label>
                    <p>You can mark this review as private. Then, your thoughts will be for your eyes only, ensuring your review is seen by no one but you.</p>
                </div>
                <div className="ratingContainer">
                    <p>Your Rating:</p>
                    <Rating name="half-rating" value={rating} onChange={(event, newValue) => { if (newValue != null) setRating(newValue);}} defaultValue={2.5} precision={0.5} emptyIcon={<StarIcon style={{ fill : "black", height: "50px", width:"50px"  }} fontSize="inherit" />} icon={<StarIcon style={{fill : "#5B7B82", height: "50px", width:"50px" }} fontSize="inherit" />}/>
                    </div>
                <div className="buttonContainer">
                    <Button className="btn btn-danger" onClick={CloseWindow}>Nope</Button>
                    <Button className="buttonSubmit" onClick={() => PostReview()}> Submit</Button>                 
                </div>
            </div>
        </div>
    </>);
}

export default AddReview;