import React from "react";
import Select from "./select";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Skeleton from "react-loading-skeleton";

interface HeaderPropType {
  selected: string;
  setSelected: (e: string) => void;
}

function Header({ setSelected, selected }: HeaderPropType) {
  const {
    users: { data: userOptions },
    app: { isLoading, error },
  } = useSelector((state: RootState) => state);

  function handleUserSelect(e: string) {
    setSelected(e);
  }

  if (error) return "Something went wrong!!!";

  return (
    <header className="flex justify-end">
      {isLoading ? (
        <div>
          <Skeleton
            className="h-[25px] w-[100px] p-5 rounded-lg shadow-md text-left flex flex-wrap"
            count={1}
          />
        </div>
      ) : (
        <Select
          options={userOptions}
          onSelect={handleUserSelect}
          label="Select User"
          value={selected}
        />
      )}
    </header>
  );
}

export default Header;
