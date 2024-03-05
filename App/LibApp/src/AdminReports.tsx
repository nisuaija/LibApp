import { FormEvent, useEffect, useState } from "react";
import "./css/AdminReports.css";
import { Review } from "./AddReview";
import axios from "axios";
import ReviewPreview from "./ReviewPreview";
import { Button } from "react-bootstrap";

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

    const Resolve = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const action = formData.get("action");
        if(action === "Dismiss")
        {
            try {
                await axios.delete(`http://localhost:5175/api/Review/DeleteReport?reviewID=${formData.get("reviewID")}&reportID=${formData.get("reportID")}`)
                console.log("Removed report");
                GetReviews();
            }
            catch(error){
                console.log(error);
            }
        }
        else if(action === "Remove review")
        {
            console.log("Remove review, finnaID: " + formData.get("finnaID") + "userID: " + formData.get("userID"));
            try {
                await axios.delete(`http://localhost:5175/api/Review/DeleteReview?userID=${formData.get("userID")}&finna_ID=${formData.get("finnaID")}`)
                console.log("Removed review");
                GetReviews();
            }
            catch(error){
                console.log(error);
            }
        }
        else if (action === "Remove review & user")
        {
            try {
                await axios.delete(`http://localhost:5175/api/Review/DeleteAllReviewsByUser?user_ID=${formData.get("userID")}`);
                console.log("Removed all reviews by user");
                await axios.delete(`http://localhost:5175/api/User/Delete User?userID=${formData.get("userID")}`);
                console.log("Removed user");
                GetReviews();
            }
            catch(error){
                console.log(error);
            }
        }
    }

    return( <>
        { 
            reviews.map(review => ( // @ts-expect-error: Reports is not null, because the axios.get will only return reviews with reports.
                review.reports.map(report => (
                    <div className="reportsElement" key={report.id}>
                        <div className="reportPreview">
                            <ReviewPreview isAdmin={true} closeWindow={() => console.log("Should not happen...")} review={review} book={null} fullReviewCallback={() => console.log("not implemented")}/>
                        </div>
                        <div className="reportRight">
                            <div className="reportInfo">
                                <div>
                                    <p><span style={{color: "gray", marginRight: "19px", marginLeft: "75px"}}>Reason:</span>{report.reason}</p>
                                    <div className="reportUnderline"></div>
                                    <p className="mt-3"><span style={{color: "gray", marginRight: "33px", marginLeft: "75px"}}>More:</span></p>
                                    <textarea className="reportTextarea" value={report.info} disabled></textarea>
  
                                    <form onSubmit={(e) => Resolve(e)}>
                                        <label className="mt-3"><span style={{color: "gray", marginLeft: "75px",}}>Action:</span></label>
                                        <select className="reportDropdown" name="action" id="action">
                                            <option value="Dismiss">Dismiss</option>
                                            <option value="Remove review">Remove review</option>
                                            <option value="Remove review & user">Remove review & user</option>
                                        </select>
                                        <input type="hidden" name="userID" value={review.userID}></input>
                                        <input type="hidden" name="finnaID" value={review.finna_ID}></input>
                                        <input type="hidden" name="reportID" value={report.id}></input>
                                        <input type="hidden" name="reviewID" value={review.reviewID}></input>
                                        <Button type="submit" className="resolveBtn">Resolve</Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ))
        }
        </>)
}

export default AdminReports;