import { useEffect, useState } from "react";
import "./css/AdminReports.css";
import { Review } from "./AddReview";
import axios from "axios";
import ReviewPreview from "./ReviewPreview";

const AdminReports = () => {

    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        GetReviews();
        // eslint-disable-next-line
    }, []);

    const GetReviews = async () => {
        try{
            const res = await axios.get("http://localhost:5175/api/Review/GetReportedReviews");
            setReviews(res.data);
            console.log(reviews);
        } catch(error)
        {
            console.error(error);
        }
    }

    return(<>
    { reviews.map(e => {
        return(
        <div className="reportsElement">
            <div className="reportPreview">
                <ReviewPreview isAdmin={true} closeWindow={() => console.log("Should not happen...")} review={e} book={null} fullReviewCallback={() => console.log("not implemented")}/>
            </div>
            <div className="reportRight"></div>
        </div>
        )
    })
    }
    </>)
}

export default AdminReports;