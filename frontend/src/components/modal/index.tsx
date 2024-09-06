import React, { useState } from "react";

interface ModalPropsTypes {
  children: React.ReactElement | string;
}

function Modal({ children }: ModalPropsTypes) {
  const [isOpen, setIsOpen] = useState(false);
  function handleToggleModal(e) {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }
  return (
    <>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        onClick={handleToggleModal}
      >
        Edit Users
      </button>
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
            isOpen ? "" : "hidden"
          }`}
          onClick={handleToggleModal}
        >
          {children}
        </div>
      )}
    </>
  );
}

export default Modal;
