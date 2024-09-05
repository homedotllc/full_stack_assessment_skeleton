import { useState } from "react";
import PropTypes from "prop-types";
import { useGetPaginatedHomesByUserQuery } from "../store/slices/apiSlice";
import Home from "./Home";
import Spinner from "./Spinner";

const Homes = (props) => {
  const { selectedUser } = props;
  const userId = selectedUser.id;

  const [page, setPage] = useState(1); 
  const limit = 10; 

  const {
    data: { homes = [], totalPages } = {},
    error,
    isLoading,
  } = useGetPaginatedHomesByUserQuery(
    { userId, page, limit },
    { skip: !userId } // Skip query if no user is selected
  );

  if (isLoading) return <Spinner />;
  if (error) return <h1>Error: {error.message}</h1>;

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="mt-4">
      <ul className="list-none flex flex-wrap justify-center gap-8">
        {homes.map((home) => (
          <Home key={home.id} home={home} />
        ))}
      </ul>

      <div className="pagination-controls mt-4 flex justify-center items-center gap-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

Homes.propTypes = {
  selectedUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Homes;
