import "./Pagination.css";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface IProps {
  setCurrentPage: (pageNumber: number) => void;
  currentPage: number;
  totalPages: number;
}

const Pagination = ({ setCurrentPage, currentPage, totalPages }: IProps) => {
  const pageNumbers: number[] = [];
  const breakLabel: string = "...";

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="pagination-container">
        <ul className="pagination-list">
          {currentPage > 1 && (
            <li className="page-item">
              <span onClick={handlePrevPage}>
                <HiChevronLeft size={24} color="#111827" />
              </span>
            </li>
          )}
          {pageNumbers.map((number) => {
            if (
              (currentPage === 1 && number < 4) ||
              (currentPage > 1 && number === 1) ||
              number === totalPages ||
              (number >= currentPage - 1 && number <= currentPage + 1)
            ) {
              return (
                <li
                  key={number}
                  className={`page-item${
                    currentPage === number ? " active" : ""
                  }`}
                >
                  <span onClick={() => setCurrentPage(number)}>{number}</span>
                </li>
              );
            } else if (
              (number === currentPage - 2 && currentPage > 3) ||
              (number === currentPage + 1 && currentPage === 2) ||
              (number === currentPage + 3 && currentPage < totalPages)
            ) {
              return (
                <li key={number} className="page-item disabled">
                  <span>{breakLabel}</span>
                </li>
              );
            }
          })}
          {currentPage < totalPages && (
            <li className="page-item">
              <span onClick={handleNextPage}>
                <HiChevronRight size={24} color="#111827" />
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
