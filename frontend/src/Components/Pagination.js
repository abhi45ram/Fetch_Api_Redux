import React from 'react';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = [];

  // This array will run from 1 to totalPages
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // This Function will handle navigating to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1); 
    }
  };

  // This Function will handle navigating to the next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);  
    }
  };

  return (
    <div className="pagination-container">
      <button onClick={prevPage} disabled={currentPage === 1}>
        Previous
      </button>

      {pageNumbers.map((number) => (
        <button key={number} onClick={() => paginate(number)}>
          {number}
        </button>
      ))}

      <button onClick={nextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
