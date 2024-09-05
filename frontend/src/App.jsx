import "./App.css";
import { useState } from "react";
import { useGetUsersQuery } from "./store/slices/apiSlice";
import Homes from "./components/Homes";
import Spinner from "./components/Spinner";

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: users, error, isLoading } = useGetUsersQuery();

  if (isLoading) return <Spinner />;
  if (error) return <h1>Error: {error.message}</h1>;

  const handleChange = (event) => {
    const selectedId = event.target.value;
    if (users) {
      const selectedUser = users.find(
        (user) => user.id === parseInt(selectedId)
      );
      setSelectedUser(selectedUser);
    }
  };

  return (
    <>
      <div className="w-full text-right flex justify-end items-center">
        <p>Select User: </p>
        <select onChange={handleChange} className="px-4 py-2 border">
          <option value="">Select a User</option>
          {users
            .filter((user) => user.username !== "" && user.email !== "")
            .map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
        </select>
      </div>
      {selectedUser && <Homes selectedUser={selectedUser} />}
    </>
  );
}

export default App;
