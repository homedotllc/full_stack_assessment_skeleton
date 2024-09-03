import React from 'react';
import { useSelector } from 'react-redux';
import { useGetHomesQuery } from '../redux/apiSlice';
import UserDropdown from '../components/UserDropdown';
import HomeCard from '../components/HomeCard';

const HomesForUserPage = () => {
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const { data: homes = [], error, isLoading } = useGetHomesQuery(selectedUser, {
    skip: !selectedUser, // Skip the query if no user is selected
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading homes</p>;

  return (
    <div>
      <UserDropdown />
      <div className="homes-list">
        {homes?.data?.map((home) => (
          <HomeCard key={home.id} home={home} />
        ))}
      </div>
    </div>
  );
};

export default HomesForUserPage;
