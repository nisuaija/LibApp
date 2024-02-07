import { useEffect, useState } from "react";
import CurrentReadsListElement from "./currentreads-list-element";
import { userBook } from "./wishlist";
import axios from "axios";

const CurrentReadsList = () => {

    const [userBooks, setUserBooks] = useState<userBook[]>([]);

    useEffect(() => {
        GetUserbooks();
    }, [])

    const GetUserbooks = async () => {
        try{
            const userData = await axios.get(`http://localhost:5175/api/Books/GetUserBooks?userID=${localStorage.getItem('userID')}`)         
            const list: userBook[] = [];

            for(const x of userData.data)
            {
                if(x.status === "current")
                list.push(x);
            }

            setUserBooks(list);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    return(<>
    {   userBooks.map((e, index) => {
            return(
                <CurrentReadsListElement refresh={GetUserbooks} book={e} key={index}/>
            );
    })}
    </>);
}

export default CurrentReadsList;