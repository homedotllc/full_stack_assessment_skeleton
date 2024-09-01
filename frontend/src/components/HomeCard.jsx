import React, { useState, useEffect } from 'react';
import { useUpdateUsersForHomeMutation, useFetchUsersByHomeQuery } from '../store/userApi';
import EditUserModal from './EditUserModal';
import './HomeCard.css';

const HomeCard = ({ home }) => {
  const { data: usersByHome, isLoading, error } = useFetchUsersByHomeQuery(home.id);




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
      await updateUsersForHome({
        "homeId": home.id,
        "userIds": selectedUsers
      });



      setIsModalOpen(false);


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
          homeId={home.id}
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
