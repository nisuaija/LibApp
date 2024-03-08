import { Button, Col, Row } from "react-bootstrap"
import "./css/BookData.css"
import {book} from "./AddBook"
import Rating from "@mui/material/Rating/";
import StarIcon from "@mui/icons-material/Star"
import { useEffect, useState } from "react";
import axios from "axios";
import EditIcon from "./assets/EditIcon.svg?react";

const BookData = (props : {data : book, failed : boolean}) => {
    const [score, setScore] = useState(0);
    const [editCover, setEditCover] = useState(false);
    const [link, setLink] = useState(props.data.image);
    const GetRating = async () =>
    {
        const rating = await axios.get(`http://localhost:5175/api/Review/GetAverageScoreByBook?finna_ID=${props.data.finna_ID}`)
        setScore(Number(rating.data));
    }

    useEffect(() => {
        GetRating();
         // eslint-disable-next-line
    }, [])

    return(
        <>
        {props.failed == false ?
        <div>
            <h5>{props.data.title}</h5>
            <Row className="mt-4">
                <Col>          
                { editCover ?<>
                <label htmlFor="link" className="coverEditLabel">Link:</label>
                <input name="link" value={link} onChange={e => setLink(e.target.value)} defaultValue={props.data.image} className="coverEditInput"></input>
                <Button onClick={() =>{props.data.image = link; setEditCover(false);}} className="coverEditButton">Set</Button>
                </>
                :
                <><img onClick={()=> setEditCover(true)} className="cover coverhvr" src={props.data.image}></img><EditIcon className="white-icon coverEdit"/></>
                }
                </Col>
                <Col className="bookInfo">
                    <p className="infoTitle">Author:</p>
                    <p className="infoText">{props.data.author}</p>
                    <p className="infoTitle">Pages:</p>
                    <p className="infoText">{props.data.pages}</p>
                    <p className="infoTitle">ISBN:</p>
                    <p className="infoText">{props.data.isbn}</p>
                    <p className="infoTitle">User score:</p>
                    <Rating readOnly name="half-rating" className="addBookRating"  value={score} precision={0.5} emptyIcon={<StarIcon style={{ fill : "black", height: "30px", width:"30px"  }} fontSize="inherit" />} icon={<StarIcon style={{fill : "white", height: "30px", width:"30px" }} fontSize="inherit" />}/>
                </Col>
            </Row>
        </div>
        :
        <p>Book not found</p>
        }
        </>
    )
}

export default BookData;