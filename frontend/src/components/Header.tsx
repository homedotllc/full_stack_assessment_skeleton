import React from "react";
import Select from "./select";
import { useSelector } from "react-redux";

interface HeaderPropType {
  selected: string;
  setSelected: (e: string) => void;
}

function Header({ setSelected, selected }: HeaderPropType) {
  const { data: userOptions } = useSelector((state) => state.users);

  function handleUserSelect(e: string) {
    setSelected(e);
  }
  return (
    <header className="flex justify-end">
      <Select
        options={userOptions}
        onSelect={handleUserSelect}
        label="Select User"
        value={selected}
      />
    </header>
  );
}

export default Header;
