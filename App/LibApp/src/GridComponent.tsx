import "./css/GridComponent.css"
import { userBook } from "./wishlist";
import GridBook from "./GridBook";

const GridComponent = (props: {books: userBook[], refresh: () => void}) => {
    return(<>
        <div className="row grid">
            {props.books.map((e, index)=> {
                return(<GridBook refresh={props.refresh} userbook={e} key={index} />);
            })}      
        </div>
    </>);
}

export default GridComponent;