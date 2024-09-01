import React from 'react';
import { useFetchUsersQuery } from '../../store/userApi';
import './EditUserModal.css';

const EditUserModal = ({ selectedUsers, setSelectedUsers, homeName, onSave, onClose }) => {
  const { data: allUsers, isLoading, error } = useFetchUsersQuery();

  // Handle loading and error states
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
        <h2>Modify Users for: {homeName}</h2>
        <div className="user-list">
          {allUsers.map((user) => (
            <div key={user.id} className="user-item">
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
        </div>
        <div className="buttons">
          
          <button className="button-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="button" onClick={onSave} disabled={selectedUsers.length === 0}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
