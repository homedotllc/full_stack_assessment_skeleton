import React, { useEffect, useState } from 'react';
import { useGetUsersByHomeIdQuery, useGetUsersQuery, useUpdateUserHomesMutation } from '../redux/apiSlice';
import { fetchHomes } from '../redux/homeSlice';
import { useDispatch, useSelector } from 'react-redux';

const EditUserModal = ({ isOpen, onClose, content, currentPage }) => {
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [error, setError] = useState('');

  const { data: allUsers } = useGetUsersQuery();
  const { data: mappedUsers } = useGetUsersByHomeIdQuery(content.id);
  const [updateUserHomes] = useUpdateUserHomesMutation();
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.user.selectedUser);

  useEffect(() => {
    if (allUsers) {
      setUsers(allUsers);
    }
    if (mappedUsers) {
      const mappedUserIds = mappedUsers.map(user => user.id);
      setSelectedUserIds(mappedUserIds);
    }
  }, [allUsers, mappedUsers]);

  const handleCheckboxChange = (userId) => {
    let updatedSelectedUserIds;
    if (selectedUserIds.includes(userId)) {
      updatedSelectedUserIds = selectedUserIds.filter(id => id !== userId);
    } else {
      updatedSelectedUserIds = [...selectedUserIds, userId];
    }
    
    setSelectedUserIds(updatedSelectedUserIds);
    
    // Check if at least one user is selected
    if (updatedSelectedUserIds.length === 0) {
      setError('Please select at least one user.');
    } else {
      setError('');
    }
  };

  const handleSave = async () => {
    if (selectedUserIds.length === 0) {
      setError('Please select at least one user.');
      return;
    }
    await updateUserHomes({ homeId: content.id, userIds: selectedUserIds });
    dispatch(fetchHomes({ userId: selectedUser, page: currentPage }));
    onClose(); // Close the modal after saving
  };

  if (!isOpen) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <button style={closeButtonStyle} onClick={onClose}>X</button>
        <h4>Modify Users for: {content.street_address}</h4>
        <div>
          {users.map((user) => (
            <div key={user.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedUserIds.includes(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                />
                {user.username}
              </label>
            </div>
          ))}
        </div>
        {error && <div style={errorStyle}>{error}</div>}
        <div style={buttonContainerStyle}>
          <button style={cancelButtonStyle} onClick={onClose}>Cancel</button>
          <button
            style={selectedUserIds.length === 0 ? cancelButtonStyle : saveButtonStyle}
            onClick={handleSave}
            disabled={selectedUserIds.length === 0}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  maxWidth: '500px',
  width: '100%',
  position: 'relative',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  border: 'none',
  background: 'white',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '50%',
  padding: '10px',
  height: '30px',
  width: '30px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'bold',
  boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
};

const errorStyle = {
  color: 'red',
  marginTop: '10px',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '20px',
};

const cancelButtonStyle = {
  marginRight: '10px',
  padding: '10px 20px',
  backgroundColor: '#f0f0f0',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const saveButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default EditUserModal;




