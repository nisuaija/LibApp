/// <reference types="vite-plugin-svgr/client" />

import "./css/AddBook.css";
import "./css/App.css";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import SearchIcon from './assets/Search.svg?react';
import { useState } from "react";
import axios from "axios";
import BookData from "./BookData";
import { v4 as uuidv4 } from 'uuid';

export interface book 
{
    author : string,
    finna_ID : string,
    image : string,
    isbn : string,
    pages : number,
    title : string
}

const AddBook = (props : {closePopUp :  () => void, getWishlisted : () => void}) =>
{
const [addingToDatabase, setAddingToDatabase] = useState(false);
const [searchQuery, setSearchQuery] = useState("");
const [searched, setSearched] = useState(false);
const [isSearchComplete, setIsSearchComplete] = useState(false);
const [searchFailed, setSearchFailed] = useState(false);
const [bookData, setBookData] = useState<book>({
    author : "default",
    finna_ID : "default",
    image : "default",
    isbn : "default",
    pages : 0,
    title : "default"
});

const AddBookToDatabase = async () => {
    setAddingToDatabase(true);
    try
    {
        const foundBook = await axios.get(`http://localhost:5175/api/Books/GetBook?id=${bookData.finna_ID}`);
        console.log(`${foundBook.data.title} is already in database. Adding to wishlist...`);
        AddBookToWishlist();
    }
    catch
    {
        console.log("Adding book to database...")
        try
        {
            await axios.post(`http://localhost:5175/api/Books/AddBook`, bookData);
            console.log("Book added successfully to database. Adding to wishlist...");
            AddBookToWishlist();
        }
        catch (error)
        {
            console.log(error);
            console.log("Book couldn't be posted to database");
        }
    }
    props.closePopUp();
}

const AddBookToWishlist = async () => {

    const newUserBook =
    {
        ID: uuidv4(),
        finna_ID: bookData.finna_ID,
        dueDate: new Date(),
        startDate: new Date(),
        endDate: new Date(),
        pagesRead: 0,
        status: "wishlist",
        Book: bookData,
        isAvailable: false
    }
    
    try
    {
        console.log(localStorage.getItem('userID'));
        await axios.post(`http://localhost:5175/api/Books/AddUserBook?userID=${localStorage.getItem('userID')}`, newUserBook);
        console.log("Book added to wishlist");
        props.getWishlisted();
    }
    catch(error)
    {
        console.log(error);
    }

}

const GetID = async () => {
    try //Get ID from Finna
    {       
        setIsSearchComplete(false);
        setSearchFailed(false);
        const response = await axios.get(`http://localhost:5175/api/Finna/GetIDbyTitle?title=${searchQuery}`);
        console.log("Found ID for book: "+response.data)
        try //Find book drom database
        {
            const foundBook = await axios.get(`http://localhost:5175/api/Books/GetBook?id=${response.data}`);
            console.log(foundBook.data);
            setBookData(foundBook.data);
        }
        catch(error)
        {
            console.log("Searching book from Finna");
            try //If not found from database, find book from Finna.
            {
                const foundBook = await axios.get(`http://localhost:5175/api/Finna/GetBookDataByID?id=${response.data}`);
                console.log(foundBook.data);
                setBookData(foundBook.data);
            }
            catch (error)
            {
                console.log(error);
                console.log("Book doesn't exist in database nor Finna")
                setSearchFailed(true);
            }
        }

    }
    catch(error)
    {
        console.log(error);
        setSearchFailed(true);
    }

    setIsSearchComplete(true);
}


    return(
        <>
        <div className="SearchContainer">
            <div className="SearchPopUp">
                <img onClick={props.closePopUp} className="x" src="X.png"></img>
                <h5 className="titlecolor">Search a book</h5>
                <InputGroup className="mt-4">
                    <Form.Control onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Title"
                    aria-label="searchQuery"
                    />
                <Button onClick={() => {setSearched(true); GetID();}} className="button" id="button-addon2">
                    <SearchIcon className="white-icon"/>
                </Button>
                </InputGroup>
            </div>
            {searched &&
            <div className="SearchPopUp-Result">
                { isSearchComplete == true ? <BookData data={bookData} failed={searchFailed}/>
                : <img className="loadingGif" src="loadingGIF.gif" /> }          
            </div>}
            {(isSearchComplete == true && searchFailed == false) &&
            <div className="SearchPopUp-Bottom">
                <h5>Is this the book you were looking for?</h5>
                { addingToDatabase == false ?
                    <Button onClick={AddBookToDatabase} className="button">Add to wishlist</Button>
                :
                    <img className="loadingAdd" src="loadingGIF.gif" />
                }
            </div>}
        </div>
        </>
    )
}

export default AddBook;