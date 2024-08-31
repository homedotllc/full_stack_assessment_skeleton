import React, { useState, useEffect } from 'react';
import { useFetchUsersByHomeQuery, useUpdateUsersForHomeMutation } from '../store/userApi';
import EditUserModal from './EditUserModal.jsx';

const HomeCard = ({ home }) => {
  const { data: usersByHome, isLoading, error } = useFetchUsersByHomeQuery(home.street_address);
  const [updateUsersForHome] = useUpdateUsersForHomeMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // This effect will run whenever the modal is opened
  useEffect(() => {
    if (isModalOpen && usersByHome) {
      setSelectedUsers(usersByHome.map(user => user.username)); // Set selected users to the users associated with the home
    }
  }, [isModalOpen, usersByHome]);

  const handleSave = async () => {
    await updateUsersForHome({ streetAddress: home.street_address, users: selectedUsers });
    setIsModalOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="home-card">
      <h3>{home.street_address}</h3>
      <button onClick={() => setIsModalOpen(true)}>Edit Users</button>
      {isModalOpen && (
        <EditUserModal
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default HomeCard;
