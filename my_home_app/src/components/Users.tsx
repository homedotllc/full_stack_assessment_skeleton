import React, { useState } from "react";
import { useGetUsersQuery } from "../services/usersApi";
import HomeList from "./HomeList";

interface UsersProps {}

const Users: React.FC<UsersProps> = () => {
  const [selectedUserId, setSelectedUserId] = useState<number>(0);

  // Use the query hook to fetch all users
  const { data: users, error, isLoading } = useGetUsersQuery();

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Failed to load users</p>;

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(event.target.value));
  };
  return (
    <div>
      <form className="flex justify-end items-center mb-6 mt-4 mr-4">
        <label htmlFor="users" className="mr-4">
          <h3 className="text-lg font-semibold text-gray-700">Select user: </h3>
        </label>
        <select
          name="users"
          id="users"
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={selectedUserId} // Set the value of the select
          onChange={handleSelectChange} // Handle the change event
        >
          {users?.map((user) => (
            <option value={user.id}>{user.username}</option>
          ))}
        </select>
      </form>
      <HomeList userId={selectedUserId} users={users ?? []} />
    </div>
  );
};

export default Users;
export {};
