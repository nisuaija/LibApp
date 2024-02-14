import { useEffect, useState } from "react";
import "./css/history-list.css"
import HistoryListElement from "./history-list-element";
import { userBook } from "./wishlist";
import axios from "axios";
import SortIcon from "./assets/sortIcon.svg?react";


const HistoryList = () => {

    const [userBooks, setUserBooks] = useState<userBook[]>([]);
    const [isAscending, setIsAscending] = useState<boolean>(false);
    const [lastSort, SetLastSort] = useState("4");
    
//#region Sorting Algorithms
    const SortByDate = (books: userBook[]) : userBook[] => {
        const sortedBooks = [...books].sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
        return sortedBooks;
    }

    const SortByTitle = (books: userBook[]) : userBook[] => {
        const sortedBooks = [...books].sort((a, b) => (a.book?.title || '').localeCompare(b.book?.title || ''));
        return sortedBooks;
    }

    const SortByAuthor = (books: userBook[]) : userBook[] => {
        const sortedBooks = [...books].sort((a, b) => (a.book?.author || '').localeCompare(b.book?.author || ''));
        return sortedBooks;
    }

    const SortByPages = (books: userBook[]) : userBook[] => {
        const sortedBooks = [...books].sort((a, b) => (b.book?.pages || 0) - (a.book?.pages || 0));
        return sortedBooks;
    }

    const SortByRating = (books: userBook[]) : userBook[] => {
        const sortedBooks = [...books].sort((a, b) => (b.review?.score || 0) - (a.review?.score || 0)); 
        return sortedBooks;
    }

    const [sortingMethod, setSortingMethod] = useState<(books: userBook[]) => userBook[]>(() => SortByDate);
//#endregion

    useEffect(() => {
        GetUserbooks();
        // eslint-disable-next-line
    }, [sortingMethod, isAscending]);

    const GetUserbooks = async () => {
        try{
            const userData = await axios.get(`http://localhost:5175/api/Books/GetUserBooks?userID=${localStorage.getItem('userID')}`)         
            const list: userBook[] = [];

            for(const x of userData.data)
            {
                if(x.status === "finished")
                    list.push(x);
            }

            let sortedBooks = sortingMethod(list);

            if (!isAscending)
                sortedBooks = sortedBooks.reverse();
            setUserBooks(sortedBooks);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    const handleSortingMethodChange = (sortMethod: (books: userBook[]) => userBook[], sort : string) => {
        // Toggle the sorting order if the same button is clicked twice
        if (sort === lastSort) {
            setIsAscending(!isAscending);
        } else {
            setIsAscending(true);
        }
        setSortingMethod(() => sortMethod);
        SetLastSort(sort);
    }

    return(<>
            <table>
                <thead>
                <tr>
                    <th onClick={() => handleSortingMethodChange(SortByTitle, "1")}>Title<SortIcon className="white-icon"/></th>
                    <th onClick={() => handleSortingMethodChange(SortByAuthor, "2")}>Author<SortIcon className="white-icon"/></th>
                    <th className="text-center" onClick={() => handleSortingMethodChange(SortByPages, "3")}>Pages<SortIcon className="white-icon"/></th>
                    <th className="text-center" onClick={() => handleSortingMethodChange(SortByDate, "4")}>Read Date<SortIcon className="white-icon"/></th>
                    <th className="text-center" onClick={() => handleSortingMethodChange(SortByRating, "5")}>My Review<SortIcon className="white-icon"/></th>
                </tr>
                </thead>
                <tbody>
                {
                    userBooks.map((e, index) => {
                        return(<>
                            <HistoryListElement refresh={GetUserbooks} book={e} key={index}/>
                        </>)
                    })
                }
                </tbody>
            </table>
        </>);
}

export default HistoryList;