import { Col, Row } from "react-bootstrap"
import "./css/BookData.css"
import {book} from "./AddBook"

const BookData = (props : {data : book, failed : boolean}) => {
    return(
        <>
        {props.failed == false ?
        <div>
            <h5>{props.data.title}</h5>
            <Row className="mt-4">
                <Col>
                <img className="cover" src={props.data.image}/>
                </Col>
                <Col className="bookInfo">
                    <p className="infoTitle">Author:</p>
                    <p className="infoText">{props.data.author}</p>
                    <p className="infoTitle">Pages:</p>
                    <p className="infoText">{props.data.pages}</p>
                    <p className="infoTitle">ISBN:</p>
                    <p className="infoText">{props.data.isbn}</p>
                    <p className="infoTitle">User score:</p>
                    <p className="infoText">X X X X X</p>
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