/// <reference types="vite-plugin-svgr/client" />
import { useEffect, useState } from "react";
import AddBook from "./AddBook";
import "./App.css";
import AddIcon from './assets/LibraryAdd.svg?react';
import GridComponent from "./GridComponent";
import axios from "axios";

const Wishlist = () => {

    const [showAddBook, setShowAddBook] = useState(false);
    const [userBooks, setUserBooks] = useState<string[]>([]);
    const [showGrid, setShowGrid] = useState(false);

    useEffect(() => {
        GetWishlistedBooks();
    }, [])

    useEffect(() => {
        setShowGrid(true);
    }, [userBooks])

    const GetWishlistedBooks = async () =>{
        try{
            const userData = await axios.get(`http://localhost:5175/api/Books/GetUserBooks?userID=${localStorage.getItem('userID')}`)         
            const list: string[] = [];

            for(const x of userData.data)
                list.push(x.finna_ID);

            setUserBooks(list);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    return (
        <>
        <div className="header">
            <div className="header-text">Wishlist</div>     
            <AddIcon onClick={() => setShowAddBook(true)} className="white-icon header-icon"/>
        </div>
        <div className="content-page">
            { showAddBook &&
            <AddBook getWishlisted={GetWishlistedBooks} closePopUp={() => setShowAddBook(false)}/>
            }
            <div>
              { showGrid &&
              <GridComponent books={userBooks}/>
              }
            </div>
        </div>
        </>
    )
}

export default Wishlist;