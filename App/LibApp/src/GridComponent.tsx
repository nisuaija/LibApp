import "./GridComponent.css"

const GridComponent = (props: {books: string[]}) => {
    return(<>
        <div className="row grid">
            {props.books.map((e, index)=> {
                return(<div key={index} className="col-md-2">
                <p>{e}</p>
            </div>);
            })}      
        </div>
    </>);
}

export default GridComponent;