import React from 'react';
import { useFetchUsersQuery } from '../store/userApi';
import './EditUserModal.css';
const EditUserModal = ({ selectedUsers, setSelectedUsers,homeName ,onSave, onClose,children }) => {
  const { data: allUsers, isLoading, error } = useFetchUsersQuery();





  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleCheckboxChange = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter(user => user !== id) : [...prev, id]
    );
  };



  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <h2>Modify Users for :{homeName}</h2>
      {allUsers.map((user) => (
        <div key={user.id}>
          <label>
            <input
              type="checkbox"
              checked={selectedUsers.includes(user.id)}
              onChange={() => handleCheckboxChange(user.id)}
            />
          
            {user.username}
          </label>
        </div>
      ))}
      <div className="buttons">
      <button className='button' onClick={onSave} disabled={selectedUsers.length === 0}>Save</button>
      <button className='button' onClick={onClose}>Cancel</button>
      </div>
    </div>
    </div>
  );
};

export default EditUserModal;
