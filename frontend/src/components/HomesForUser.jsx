import React, { useState } from 'react';
import { useFetchUsersQuery, useFetchHomesByUserQuery } from '../store/userApi';
import HomeCard from './HomeCard.jsx';
import './HomesForUser.css';

const HomesForUser = () => {
  const { data: users, isLoading: usersLoading, error: usersError } = useFetchUsersQuery();
  const [selectedUser, setSelectedUser] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: homesData, isLoading: homesLoading, error: homesError } = useFetchHomesByUserQuery(
    {
      userId: selectedUser,
      page: currentPage,
    },
    {
      skip: !selectedUser,
    }
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= homesData?.totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (usersLoading) return <div>Loading...</div>;
  if (usersError) return <div>Error: {usersError.message}</div>;

  return (
    <div>
      <div className="userSelection">
      <p>Select user:</p>
      <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </select>
      </div>

      {!selectedUser ? (
        <div className='nothing'>Nothing to show</div>
      ) : homesLoading ? (
        <div>Loading...</div>
      ) : homesError ? (
        <div>Error: {homesError.message}</div>
      ) : (
        <>
          <div className="homes-container">
            {homesData?.homes?.map((home) => (
              <HomeCard key={`${home.id}-${home.street_address}`} home={home} />
            ))}
          </div>
          <div className="pagination-controls">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {homesData?.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === homesData?.totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomesForUser;
