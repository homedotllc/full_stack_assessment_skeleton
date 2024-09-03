import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
import { useGetUsersQuery } from '../redux/apiSlice';

const UserDropdown = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.user.selectedUser);
  
  // Fetch users from the API
  const { data: users = [], error, isLoading } = useGetUsersQuery();

  const handleChange = (event) => {
    dispatch(setSelectedUser(event.target.value));
  };

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>Error loading users.</p>;
  }

  return (
    <select value={selectedUser || ''} onChange={handleChange}>
      <option value="">Select a User</option>
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.username}
        </option>
      ))}
    </select>
  );
};

export default UserDropdown;
