import "./css/App.css";
import "./css/CurrentReads.css"
import CurrentReadsList from "./currentreads-list";

const Currentreads = () => {
    return (
        <>
        <div className="header">
              Current Reads
        </div>
        <div className="content-page">
            <CurrentReadsList/>
        </div>
        </>
    )
}

export default Currentreads;