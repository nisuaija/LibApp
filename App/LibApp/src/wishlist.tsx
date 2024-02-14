/// <reference types="vite-plugin-svgr/client" />
import { useEffect, useState } from "react";
import AddBook, { book } from "./AddBook";
import "./css/App.css";
import AddIcon from './assets/LibraryAdd.svg?react';
import GridComponent from "./GridComponent";
import axios from "axios";
import Refresh from './assets/Refresh.svg?react';
import "./css/wishlist.css";
import BlurLayer from "./BlurLayer";
import { Review } from "./AddReview";

export interface userBook 
{
    ID: string
    finna_ID: string,
    dueDate: Date,
    startDate: Date,
    endDate: Date,
    pagesRead: number,
    status: string,
    book: book | null,
    isAvailable: boolean;
    review: Review | null
}

const Wishlist = () => {

    const [showAddBook, setShowAddBook] = useState(false);
    const [userBooks, setUserBooks] = useState<userBook[]>([]);
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
            const list: userBook[] = [];

            for(const x of userData.data)
            {
                if(x.status === "wishlist")
                list.push(x);
            }

            list.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
            list.sort((a, b) => {
                if (a.isAvailable === b.isAvailable) return 0;
                if (a.isAvailable) return -1;
                return 1;
            });
            setUserBooks(list);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    const CheckAvailability = async () => {
        try {
            const updatedBooks = await Promise.all(userBooks.map(async book => {       
    
                let isAvailable = false;
                try {
                    const res = await axios.get(`http://localhost:5175/api/Finna/GetAvailability?id=${book.finna_ID}`);
                    if (res.data.includes(localStorage.getItem("localLibrary"))) {
                        isAvailable = true;
                    }
                } catch (error) {
                    console.log(error);
                }

                //Jos available status vaihtuu niin tehdään PUT
                if(isAvailable != book.isAvailable)
                    axios.put(`http://localhost:5175/api/Books/UpdateUserBook?userID=${localStorage.getItem("userID")}`, {...book, isAvailable: isAvailable})
    
                return {...book, isAvailable: isAvailable};      
            }));
            
            //Sortti niin että availablet ensin
            updatedBooks.sort((a, b) => {
                if (a.isAvailable === b.isAvailable) return 0;
                if (a.isAvailable) return -1;
                return 1;
            });
            
            console.log("Refreshed availability statuses")
            setUserBooks(updatedBooks);
        } catch (error) {
            console.error("Error updating user books:", error);
        }
    }

    return (
        <>
        <div className="header">
            <div className="header-text">Wishlist</div>
            <Refresh onClick={CheckAvailability} className="white-icon header-icon2"/>
            <AddIcon onClick={() => setShowAddBook(true)} className="white-icon header-icon"/>
        </div>
        <div className="content-page">
            {showAddBook && 
            <BlurLayer/>}
            { showAddBook &&<>
            <AddBook getWishlisted={GetWishlistedBooks} closePopUp={() => setShowAddBook(false)}/>
            </>
            }
            <div style={{display: "flex", justifyContent: "center"}}>
            <div className="gridContainer">
              { showGrid &&
              <GridComponent refresh={GetWishlistedBooks} books={userBooks}/>
              }
            </div>
            </div>
        </div>

        </>
    )
}

export default Wishlist;