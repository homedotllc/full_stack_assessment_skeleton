import React, { useState, useEffect } from 'react';
import { useFetchUsersByHomeQuery, useUpdateUsersForHomeMutation } from '../store/userApi';
import EditUserModal from './EditUserModal';
import './HomeCard.css';

const HomeCard = ({ home }) => {
  const { data: usersByHome, isLoading, error } = useFetchUsersByHomeQuery(home.street_address);
  const [updateUsersForHome] = useUpdateUsersForHomeMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // This effect runs when the modal is opened or usersByHome changes
  useEffect(() => {
    if (isModalOpen && usersByHome) {
      // Initialize selected users with IDs of users associated with the home
      setSelectedUsers(usersByHome.map(user => user.id));
    }
  }, [isModalOpen, usersByHome]);

  const handleSave = async () => {   
    try {
      await updateUsersForHome( {
        "homeid": home.id,
        "userIds": selectedUsers
      }); // Note the change to userIds



      setIsModalOpen(false);
      console.log('Users updated successfully');
    } catch (error) {
      console.error('Error updating users:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="home-card">
      <h3>{home.street_address}</h3>
      <p>List price: ${home.list_price}</p>
      <p>Home State: {home.state}</p>
      <p>Zip: {home.zip}</p>
      <p>Sqft: {home.sqft}</p>
      <p>Beds: {home.beds}</p>
      <p>Baths: {home.baths}</p>

      <button onClick={() => setIsModalOpen(true)}>Edit Users</button>
      {isModalOpen && (
        <EditUserModal
          homeName={home.street_address}
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
