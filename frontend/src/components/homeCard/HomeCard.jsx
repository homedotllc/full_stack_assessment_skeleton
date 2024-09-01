import React, { useState, useEffect } from 'react';
import { useUpdateUsersForHomeMutation, useFetchUsersByHomeQuery } from '../../store/userApi';

import EditUserModal from '../modal/EditUserModal';
import './HomeCard.css';

const HomeCard = ({ home }) => {
  const { data: usersByHome, isLoading, error, refetch } = useFetchUsersByHomeQuery(home.id);
  const [updateUsersForHome] = useUpdateUsersForHomeMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    if (isModalOpen && usersByHome) {
      setSelectedUsers(usersByHome.map(user => user.id));
    }
  }, [isModalOpen, usersByHome]);

  const handleSave = async () => {
    try {
      await updateUsersForHome({
        "homeId": home.id,
        "userIds": selectedUsers
      });
      // Refetch the users to update the UI
      refetch();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating users:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="home-card">
        <h3>{home.street_address}</h3>
        <p>List price: ${home.list_price}</p>
        <p>Home State: {home.state}</p>
        <p>Zip: {home.zip}</p>
        <p>Sqft: {home.sqft}</p>
        <p>Beds: {home.beds}</p>
        <p>Baths: {home.baths}</p>

        <button onClick={() => setIsModalOpen(true)}>Edit Users</button>
      </div>

      {isModalOpen && (
        <EditUserModal
          homeName={home.street_address}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default HomeCard;
