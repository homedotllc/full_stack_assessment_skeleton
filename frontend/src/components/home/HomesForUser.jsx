import React, { useState, useMemo, useCallback } from 'react';
import { useFetchUsersQuery, useFetchHomesByUserQuery } from '../../store/userApi.js';
import HomeCard from '../homeCard/HomeCard.jsx';
import Pagination from '../pagination/Pagination.jsx';
import Skeleton from '../skeleton/Skeleton.jsx';
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

  // Memoize user options to avoid unnecessary re-renders
  const userOptions = useMemo(
    () => users?.map(({ id, username }) => (
      <option key={id} value={id}>
        {username}
      </option>
    )),
    [users]
  );

  // Use useCallback to memoize the function
  const handlePageChange = useCallback(
    (newPage) => {
      if (newPage >= 1 && newPage <= (homesData?.totalPages || 0)) {
        setCurrentPage(newPage);
      }
    },
    [homesData?.totalPages]
  );

  const handleUserChange = useCallback(
    (e) => {
      setSelectedUser(e.target.value);
      setCurrentPage(1); // Reset to the first page when the user changes
    },
    []
  );

  if (usersLoading) return <div>Loading users...</div>;
  if (usersError) return <div>Error: {usersError.message}</div>;

  return (
    <div>
      <div className="userSelection">
        <p>Select user:</p>
        <select onChange={handleUserChange} value={selectedUser}>
          <option value="">Select a user</option>
          {userOptions}
        </select>
      </div>

      {!selectedUser ? (
        <div className='nothing'>Nothing to show</div>
      ) : homesLoading ? (
        <Skeleton />
      ) : homesError ? (
        <div>Error: {homesError.message}</div>
      ) : (
        <>
          <div className="homes-container">
            {homesData?.homes?.map((home) => (
              <HomeCard key={home.id} home={home} />
            ))}
          </div>
          {homesData?.totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={homesData.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default HomesForUser;
