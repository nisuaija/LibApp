import "./css/App.css";
import HistoryList from "./history-list";

const History = () => {
    return (
        <>
        <div className="header">
            History
        </div>
        <div className="content-page">
              <HistoryList/>
        </div>
        </>
    )
}

export default History;