import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import ReactPaginate from "react-paginate";
function Schedule() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/schedule");
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = data.slice(offset, offset + itemsPerPage);
  const handleNextPage = () => {
    if (currentPage < pageCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div>
    <div className="schedule">
      {currentPageData.map((schedule) => {
        return <div key={schedule.id} className="schedule1">
            <h1>{schedule.courseName}</h1>
            <p>{schedule.deadline}</p>
            <p>{schedule.duration}</p>
            <h4>{schedule.coachName}</h4>
            <h3>Only {schedule.spacesAvailable} places left!</h3>
            <Link to={`/schedule/${schedule.id}`}>Join Now</Link>
        </div>;
      })}
    </div>
    <div className="pagination">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0} 
          className={currentPage === 0 ? "disabled" : ""}
        >
          Prev
        </button>
        <span>
          Page {currentPage + 1} of {pageCount}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === pageCount - 1}
          className={currentPage === pageCount - 1 ? "disabled" : ""}
        >
          Next
        </button>
        </div>
    </div>
  );
}

export default Schedule;
