/// <reference types="vite-plugin-svgr/client" />
import AddBook from "./AddBook";
import "./App.css";
import AddIcon from './assets/LibraryAdd.svg?react';

const Wishlist = () => {
    return (
        <>
        <div className="header">
            <div className="header-text">Wishlist</div>     
            <AddIcon className="white-icon header-icon"/>
        </div>
        <div className="content-page">
            <AddBook/>
              This is wishlist
        </div>
        </>
    )
}

export default Wishlist;