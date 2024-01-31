/// <reference types="vite-plugin-svgr/client" />

import "./AddBook.css";
import "./App.css";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import SearchIcon from './assets/Search.svg?react';
import { useState } from "react";
import axios from "axios";
import BookData from "./BookData";

export interface book 
{
    author : string,
    finna_ID : string,
    image : string,
    isbn : string,
    pages : number,
    title : string
}

const AddBook = () =>
{

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
            console.log(error);
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
                <h5 className="titlecolor">Search a book</h5>
                <InputGroup className="mt-4">
                    <Form.Control onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Title"
                    aria-label="searchQuery"
                    />
                <Button onClick={() => {setSearched(true); GetID();}} className="searchButton" id="button-addon2">
                    <SearchIcon className="white-icon"/>
                </Button>
                </InputGroup>
            </div>
            {searched &&
            <div className="SearchPopUp-Result">
                { isSearchComplete == true ? <BookData data={bookData} failed={searchFailed}/>
                : <p>Searching...</p> }          
            </div>}
            {searched /*tilalle state joka tarkistaa onko result tullut*/  &&
            <div className="SearchPopUp-Bottom">

            </div>}
        </div>
        </>
    )
}

export default AddBook;