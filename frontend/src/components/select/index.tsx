import React from "react";

interface SelectProps {
  className?: string;
  options: Array<{ value: string; label: string }>;
  onSelect: (value: string) => void;
  label?: string;
  id?: string;
  value: string;
}

function Select({
  className = "",
  options,
  onSelect,
  label,
  id,
  value,
}: SelectProps) {
  return (
    <div className="mb-4 flex items-center gap-5">
      {label && (
        <label
          htmlFor={id}
          className="block text-lg font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        className={`block px-3 py-2 border rounded-md cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
        onChange={(e) => onSelect(e.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className={value === option.value ? "font-bold" : ""}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
