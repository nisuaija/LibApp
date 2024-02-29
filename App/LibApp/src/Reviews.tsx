import { useEffect, useState } from "react";
import "./css/Reviews.css";
import axios from "axios";
import ReviewPreview, { Review } from "./ReviewPreview";
import BlurLayer from "./BlurLayer";

const Reviews = (props : {finna : string, closeWindow : () => void}) => {

    const [reviews, setReviews] = useState<Review[]>([]);
    const [searchDone, setSearchDone] = useState(false);
    const [blur, setBlur] = useState(false);

    const GetReviews = async () => {
        console.log("Searching for reviews...");
        try {
        const res = await axios.get(`http://localhost:5175/api/Review/GetReviewsByBook?finna_ID=${props.finna}`);
        const list: Review[] = [];

        for(const x of res.data)
                list.push(x);

        setReviews(list);
        setSearchDone(true);
        console.log(reviews);
        console.log(reviews[0]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetReviews();
        // eslint-disable-next-line
    }, []);


    return(<>
        { searchDone &&<>
        
        <div className="reviewsGrid">
            <img src="X.png" onClick={props.closeWindow} className="reviewsX"></img>
            {reviews.map((r) => {
                return(
                    <ReviewPreview isAdmin={false} fullReviewCallback={() => setBlur(!blur)} review={r} book={null} closeWindow={()=> console.log("test")}/>
                );
            })}
            {blur && <BlurLayer/>}
        </div>   
        </>
        }
    </>);
}

export default Reviews;