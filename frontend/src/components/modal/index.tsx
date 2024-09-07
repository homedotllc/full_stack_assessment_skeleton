import React from "react";

interface ModalPropsTypes {
  children: React.ReactElement | string;
  isOpen: boolean;
  handleToggleModal: () => void;
}

function Modal({ children, isOpen, handleToggleModal }: ModalPropsTypes) {
  return (
    <>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        onClick={handleToggleModal}
      >
        Edit User
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
