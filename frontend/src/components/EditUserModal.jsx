import React from 'react';
import { useFetchUsersQuery } from '../store/userApi';

const EditUserModal = ({ usersByHome, selectedUsers, setSelectedUsers, onSave, onClose }) => {
  const { data: allUsers, isLoading, error } = useFetchUsersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleCheckboxChange = (username) => {
    setSelectedUsers((prev) =>
      prev.includes(username) ? prev.filter(user => user !== username) : [...prev, username]
    );
  };

  const isSaveDisabled = selectedUsers.length === 0;

  return (
    <div className="modal">
      <h2>Edit Users for Home</h2>
      {allUsers.map((user) => (
        <div key={user.username}>
          <label>
            <input
              type="checkbox"
              checked={selectedUsers.includes(user.username)}
              onChange={() => handleCheckboxChange(user.username)}
            />
            {user.username}
          </label>
        </div>
      ))}
      <button onClick={onSave} disabled={isSaveDisabled}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditUserModal;
