import React from "react";
import { useSelector } from "react-redux";

function UserModal() {
  const { data: userOptions } = useSelector((state) => state.users);

  return (
    <div
      className="w-[400px] bg-white p-5 rounded"
      onClick={(e) => e.stopPropagation()}
    >
      <h4 className="text-lg font-bold mb-6">
        Modify Users for: 888888 Pine street
      </h4>
      {userOptions?.map((item) => {
        return (
          <div className="flex items-center justify-start mb-2 font-semibold">
            <input type="checkbox" id="scales" name="scales" checked />
            <label htmlFor="scales" className="ml-2">
              Scales
            </label>
          </div>
        );
      })}
      <div className="flex justify-end gap-5">
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
          // onClick={handleToggleModal}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          // onClick={handleToggleModal}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default UserModal;
