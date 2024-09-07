import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useGetUserByHomeQuery,
  useSetUserOfHomeMutation,
} from "../redux/slice/api";
import { RootState } from "../redux/store";
import Skeleton from "react-loading-skeleton";

interface UserModalPropsTypes {
  street_address: string;
  handleToggleModal: () => void;
}

function UserModal({ street_address, handleToggleModal }: UserModalPropsTypes) {
  const { data, isError, isLoading } = useGetUserByHomeQuery(street_address, {
    skip: !street_address,
  });
  const { data: users } = useSelector((state: RootState) => state.users);
  const [checkedUsers, setCheckedUsers] = useState<{ [key: string]: boolean }>(
    {}
  );

  const [updateUsersForHome, { isLoading: isUpdating }] =
    useSetUserOfHomeMutation();

  useEffect(() => {
    if (data) {
      const usernamesOfCurrentHome = data.map((item) => item.username);
      const initialCheckedState = users.reduce<Record<string, boolean>>(
        (acc, user) => {
          acc[user.value] = usernamesOfCurrentHome.includes(user.value);
          return acc;
        },
        {}
      );
      setCheckedUsers(initialCheckedState);
    }
  }, [data, users]);

  const isAleastCheckedOne = Object.values(checkedUsers).some(Boolean);

  const handleCheckboxChange = (value: string) => {
    setCheckedUsers((prev) => ({
      ...prev,
      [value]: !prev[value],
    }));
  };

  const handleUpdateUserForHome = async () => {
    const usernames = Object.entries(checkedUsers).flatMap(([key, value]) =>
      value ? key : []
    );
    if (!usernames.length) {
      alert("Please select at least one User!!");
      return;
    }

    await updateUsersForHome({ street_address, usernames }).unwrap();
    handleToggleModal();
  };

  if (isError) return "Something went wrong!!!";

  return (
    <div
      className="w-[400px] bg-white p-5 rounded"
      onClick={(e) => e.stopPropagation()}
    >
      <h4 className="text-lg font-bold mb-6">
        Modify Users for: {street_address}
      </h4>
      {isLoading || isUpdating ? (
        <Skeleton count={10} />
      ) : (
        users?.map((item) => {
          return (
            <div
              key={item.value}
              className="flex items-center justify-start mb-2 font-semibold text-lg"
            >
              <input
                type="checkbox"
                id={item.value}
                name={item.value}
                checked={checkedUsers[item.value] || false}
                onChange={() => handleCheckboxChange(item.value)}
                className="cursor-pointer"
              />
              <label htmlFor={item.value} className="ml-2">
                {item.label}
              </label>
            </div>
          );
        })
      )}
      <div className="flex justify-end gap-5">
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
          onClick={handleToggleModal}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={handleUpdateUserForHome}
          disabled={!isAleastCheckedOne}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default UserModal;
