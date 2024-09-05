import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  useGetUsersByHomeQuery,
  useUpdateUsersForHomeMutation,
} from "../store/slices/apiSlice";

const EditUsersModal = (props) => {
  const home = props.home;
  const homeId = home.id;

  // Fetch users with association info
  const {
    data: users,
    error,
    isLoading,
    refetch,
  } = useGetUsersByHomeQuery(homeId, { skip: !homeId });

  // Manage selected users (use Set to avoid duplicates)
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [response, setResponse] = useState(null);
  const [updateUsersForHome] = useUpdateUsersForHomeMutation();

  // Set initially selected users based on association
  useEffect(() => {
    if (users) {
      const associatedUserIds = new Set(
        users.filter((user) => user.isAssociated).map((user) => user.id)
      );
      setSelectedUsers(associatedUserIds);
    }
  }, [users]);

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelected) => {
      const updatedSelected = new Set(prevSelected);
      if (updatedSelected.has(userId)) {
        updatedSelected.delete(userId);
      } else {
        updatedSelected.add(userId);
      }
      return updatedSelected;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const selectedUserIds = Array.from(selectedUsers);
    try {
      const response = await updateUsersForHome({ homeId, userIds: selectedUserIds }).unwrap();
      setResponse(response.message);
      // Refetch users after successful update to reflect the changes
      refetch();

      // Close the modal after 3 seconds
      setTimeout(() => {
        setResponse(null);
        props.onClose();
      }, 3000); 
    } catch (error) {
      console.error("Failed to update users for home:", error);
    }
  };

  const handleClick = (event) => {
    if (event.target === event.currentTarget) {
      props.onClose();
    }
  };

  if (isLoading) return <h1>Loading Users...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleClick}
    >
      <div className="bg-white w-1/2 md:w-96 h-auto flex flex-col rounded-md shadow-lg p-4 gap-4">
        <h2>Modify users for: {home.street_address}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {users
            .filter((user) => user.username !== "" && user.email !== "") // Filter out users with empty username or email
            .map((user) => (
              <div key={user.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`user-${user.id}`}
                  checked={selectedUsers.has(user.id)} // Automatically checked if user is associated
                  onChange={() => handleCheckboxChange(user.id)}
                  className="form-checkbox w-4 h-4 border border-gray-950"
                />
                <label htmlFor={`user-${user.id}`}>{user.username}</label>
              </div>
            ))}
          {response && <p>{response}</p>}
          <div className="w-full flex justify-end items-center gap-2">
            <button
              className="bg-slate-400 py-2 px-4 rounded-md"
              onClick={() => props.onClose()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-500 text-white py-2 px-2 rounded-md ${selectedUsers.size === 0 && "opacity-50 cursor-not-allowed"}`}
              disabled={selectedUsers.size === 0}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditUsersModal.propTypes = {
  home: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditUsersModal;
