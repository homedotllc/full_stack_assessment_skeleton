import React, { useState } from 'react';
import { useFetchUsersQuery, useFetchHomesByUserQuery } from '../store/userApi';
import HomeCard from './HomeCard.jsx';

const HomesForUser = () => {
  const { data: users, isLoading: usersLoading, error: usersError } = useFetchUsersQuery();
  const [selectedUser, setSelectedUser] = useState('');

  const { data: homes, isLoading: homesLoading, error: homesError } = useFetchHomesByUserQuery(selectedUser, {
    skip: !selectedUser,
  });

  if (usersLoading || homesLoading) return <div>Loading...</div>;
  if (usersError || homesError) return <div>Error: {usersError?.message || homesError?.message}</div>;

  return (
    <div>
      <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
        <option value="">Select a user</option>
        {users?.map((user) => (
          <option key={user.id} value={user.id}> 
            {user.username}
          </option>
        ))}
      </select>
      <div>
        {homes?.map((home) => (
          <HomeCard key={`${home.id}-${home.street_address}`} home={home} /> 
        ))}
      </div>
    </div>
  );
};

export default HomesForUser;
