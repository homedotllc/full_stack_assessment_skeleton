import PropTypes from "prop-types";
import { useState } from "react";
import EditUsersModal from "./EditUsersModal";

const Home = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHome, setSelectedHome] = useState(null);

  const handleClick = (home) => {
    setSelectedHome(home);
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedHome(null); // Reset selected home when modal is closed
  };

  const home = props.home;
  return (
    <>
      <li className="shadow-md w-64 h-72 flex flex-col justify-center items-start text-left rounded-md gap-2 px-4">
        <div>
          <h4>{home.street_address}</h4>
          <p>List Price: {home.list_price}</p>
          <p>State: {home.state}</p>
          <p>Zip Code: {home.zip}</p>
          <p>Sqft: {home.sqft}</p>
          <p>Beds: {home.beds}</p>
          <p>Baths: {home.baths}</p>
        </div>

        <div className="bg-blue-500 text-white px-4 rounded-md">
          <button
            className="py-2 px-4 text-white"
            onClick={() => handleClick(home)}
          >
            Edit Users
          </button>
        </div>
      </li>

      {isModalOpen && (
        <EditUsersModal home={selectedHome} onClose={closeModal} />
      )}
    </>
  );
};

Home.propTypes = {
  home: PropTypes.object.isRequired,
};

export default Home;
