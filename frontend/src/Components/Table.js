import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBatteryData } from '../redux/thunks/fetchDataThunk';
import './Table.css';
import Pagination from './Pagination'; 

const Table = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.data.loading);

  //Here these are the State variables for battery data, search term, current page, items per page, and filtered data
  const batteryData = useSelector((state) => state.data.data);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [filteredData, setFilteredData] = useState([]);
  const [initialData, setInitialData] = useState([]);

  // Here i am Fetching battery data on component mount
  useEffect(() => {
    dispatch(fetchBatteryData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // it will Update filtered data when batteryData changes
  useEffect(() => {
    try {
      const parsedData = JSON.parse(batteryData);
      setFilteredData(parsedData);
      setInitialData(parsedData);
    } catch (error) {
      console.error('Error parsing data:', error);
    }
  }, [batteryData]);

  // it will handle search term input change means when we search any id then it will show and again it will set 1
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setCurrentPage(1);

    // If the search term is empty then we will reset it to initial data
    if (Array.isArray(initialData) && term === '') {
      setFilteredData(initialData);
    } else if (Array.isArray(filteredData)) {
      //here Filter the data based on search term
      const filtered = filteredData.filter((item) => {
        return (
          item.id.toString().toLowerCase().includes(term) ||
          item.owner.toLowerCase().includes(term)
        );
      });
      setFilteredData(filtered);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Function to change current page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total number of pages for pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="table-container">
      <h2>Data Table</h2>
      <input
        type="text"
        placeholder="Search by ID and Name"
        className="filter-input"
        value={searchTerm}
        onChange={handleSearch}
      />
      <>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <table className="center-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>IMEI</th>
                  <th>Owner</th>
                  <th>SOC</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.imei}</td>
                    <td>{item.owner}</td>
                    <td>{item.soc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />
          </>
        )}
      </>
    </div>
  );
};

export default Table;
