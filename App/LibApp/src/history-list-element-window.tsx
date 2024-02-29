import { Button, InputGroup } from "react-bootstrap";
import "./css/history-list-element-window.css"
import { userBook } from "./wishlist";
import { useEffect, useState } from "react";
import axios from "axios";
import ReviewPreview from "./ReviewPreview";
import BlurLayer from "./BlurLayer";
import AddReview from "./AddReview";
import Rating from "@mui/material/Rating/";
import StarIcon from "@mui/icons-material/Star"
import Reviews from "./Reviews";

type properties =
{
    closeWindow : () => void,
    book : userBook,
    convertDate : (input : string) => string,
    removeBook : () => void
}

const HistoryListElementWindow = (props : properties) =>
{
    const [startDate, setStartDate] = useState(props.book.startDate.toString());
    const [endDate, setEndDate] = useState(props.book.endDate.toString());
    const [initialRender, setInitialRender] = useState(true);
    const [inDays, setInDays] = useState(0);
    const [pace, setPace] = useState(0);
    const [showAddReview, setShowAddReview] = useState(false);
    const [score, setScore] = useState(0);
    const [showReviews, setShowReviews] = useState(false);

    useEffect(() => {
        if(!initialRender)
            SaveProgress();
        else{
            setInitialRender(false);
            GetRating();
        }

        UpdateStats();
        // eslint-disable-next-line
    }, [startDate, endDate])

    const SaveProgress = async () =>
    {
        props.book.startDate = new Date(startDate);
        props.book.endDate = new Date(endDate);
        
        console.log(props.book);

        try{
            await axios.put(`http://localhost:5175/api/Books/UpdateUserBook?userID=${localStorage.getItem("userID")}`, props.book)
            console.log("Book updated");
        }
        catch(error)
        {
            console.log(error);
        }
    }

    const GetRating = async () =>
    {
        const rating = await axios.get(`http://localhost:5175/api/Review/GetAverageScoreByBook?finna_ID=${props.book.finna_ID}`);
        setScore(Number(rating.data));
    }

    const UpdateStats = () => {
        //Count days
        const differenceInMilliseconds : number = new Date(endDate).getTime() - new Date(startDate).getTime();
        const differenceInDays : number = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));

        setInDays(differenceInDays);

        //Calculate pace
        const _pace : number = Number(props.book.book?.pages) / differenceInDays;
        setPace(_pace);
    }

    return(<>
        <div className="upperBlock">
        { showReviews &&
            <BlurLayer/>
        }
        { showAddReview && <>
            <BlurLayer/>
            <div className="reviewAdding">
            <AddReview text="Care to leave a review? Your feedback helps fellow readers to discover great stories." book={props.book} isEdit={false} closeWindow={() => { setShowAddReview(false); props.closeWindow();}}  />
            </div>
        </>
        }
            <div className="leftBlock">
                <div className="historyDataContainer">
                    <h5 className="mb-4">{props.book.book?.title}</h5>
                    <p><span className="historyElementLeftText">Author:</span><span className="elementRightText">{props.book.book?.author}</span></p>
                    <p><span className="historyElementLeftText">Pages:</span><span className="elementRightText">{props.book.book?.pages}</span></p>
                    <p><span className="historyElementLeftText">ISBN:</span><span className="elementRightText">{props.book.book?.isbn}</span></p>
                    <p><span className="historyElementLeftText">User score:</span></p>
                    <div className="CRwishlistRating" onClick={() => setShowReviews(true)}>
                            <Rating readOnly name="half-rating"  value={score} precision={0.5} emptyIcon={<StarIcon style={{ fill : "black", height: "35px", width:"35px"  }} fontSize="inherit" />} icon={<StarIcon style={{fill : "white", height: "35px", width:"35px" }} fontSize="inherit" />}/>
                            <p className="showReviewsText mt-2">Show reviews</p>
                        </div>
                </div>
                <div className="historyCoverContainer">
                    <img className="historyCover" src={props.book.book?.image}></img>
                </div>
            </div>
            <div className="rightBlock">
            <Button className="addReviewButton" onClick={() => setShowAddReview(true)}>Add review</Button>
                <img src="X.png" onClick={props.closeWindow} className="x"></img>
                {props.book.review != null &&
                <ReviewPreview isAdmin={false} fullReviewCallback={() => console.log("Fullrev")} closeWindow={props.closeWindow} book={props.book} review={props.book.review !== null ? {score: props.book.review.score, userName: props.book.review.userName, text: props.book.review.text, dateTime: props.book.review.dateTime, reviewID: "nan"} : null}/>
                }                
            </div>
        </div>
        <div className="lowerBlock">
            <div className="datesContainer">
                <InputGroup>
                    <label htmlFor="startDate">Start date</label>
                    <input name="startDate" type="date" value={props.convertDate(startDate)} onChange={(e) => setStartDate(e.target.value)}></input>
                </InputGroup>
                <InputGroup>
                    <label htmlFor="endDate">End date</label>
                    <input name="endDate" type="date" value={props.convertDate(endDate)} onChange={(e) => setEndDate(e.target.value)}></input>
                </InputGroup>
                <p className="removeBTN" onClick={props.removeBook}><u>Remove book</u></p>
            </div>
            <div className="paceContainer">
            <div className="historySeparator"></div>
                <p>You finished this book in <span style={{color : "yellowgreen"}}>{inDays}</span> days!</p>
                <p>You phased thourgh the book in pace of <span style={{color : "yellowgreen"}}>{Math.round(pace)}</span> pages per day!</p>
            </div>
        </div>
        {   (showReviews && score > 0) && <div className="reviewsHistory">
            <Reviews closeWindow={() => setShowReviews(false)} finna={props.book.finna_ID} />
            </div>
        }
    </>)
}

export default HistoryListElementWindow;