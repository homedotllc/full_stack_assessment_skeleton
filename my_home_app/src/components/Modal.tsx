import React, { useEffect, useState } from "react";
import { Home } from "../services/homeApis";
import { useUpdateHomeUsersMutation } from "../services/homeApis";
import { useGetUserByHomeIdQuery, User } from "../services/usersApi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  home: Home;
  users: User[]; //list of all users
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, home, users }) => {
  const {
    data: homeUsers,
    error,
    isLoading,
    refetch,
  } = useGetUserByHomeIdQuery(home.id); // list of users present in home
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]); // Store selected user IDs

  const [updateHomeUsers, { isLoading: isUpdating }] =
    useUpdateHomeUsersMutation(); // Mutation to update users for the home

  // Clear selectedUsers when modal is closed
  useEffect(() => {
    if (isOpen) {
      refetch(); // Trigger a refetch of the home users when modal opens
    }
  }, [isOpen, refetch]);
  // Pre-select users that are already part of the home
  useEffect(() => {
    if (isOpen && homeUsers) {
      const userIdsInHome = homeUsers.map((uhm) => uhm.id);
      setSelectedUsers(userIdsInHome);
    }
  }, [isOpen, homeUsers]);

  const handleCheckboxChange = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId)); // Remove if already selected
    } else {
      setSelectedUsers([...selectedUsers, userId]); // Add if not selected
    }
  };

  // Submit the updated users list
  const handleSubmit = async () => {
    try {
      const updatedHomeUsers = await updateHomeUsers({
        homeId: home.id,
        userIds: selectedUsers,
      }).unwrap();
      // Use the updated home users directly to update the selectedUsers state
      const updatedUserIds = updatedHomeUsers.map((user) => user.id);
      setSelectedUsers(updatedUserIds); // Update selectedUsers based on the mutation response
    } catch (error) {
      console.error("Failed to update home users", error);
    }
  };

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Failed to load users</p>;
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded p-4 shadow-lg relative w-96">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">
          Modify Users for: {home.street_address}
        </h2>

        {/* List of users with checkboxes */}
        <div className="max-h-64 overflow-y-auto">
          {users?.map((user) => (
            <div key={user.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.id)} // Pre-select if user is part of the home
                onChange={() => handleCheckboxChange(user.id)} // Toggle selection
                className="mr-2"
              />
              <label className="text-gray-700">{user.username}</label>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className={`mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none ${
            isUpdating ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isUpdating} // Disable button while updating
        >
          {isUpdating ? "Updating..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default Modal;
export {};
