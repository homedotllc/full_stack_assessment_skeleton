import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import HomeCard from "./HomeCard";
import EditUserModal from "./EditUserModal";
import { fetchHomes } from "../redux/homeSlice";

const CardLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser1, setSelectedUser1] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const selectedUser = useSelector((state) => state.user.selectedUser);

  const dispatch = useDispatch();
  const homes = useSelector((state) => state.home.homes);
  const error = useSelector((state) => state.home.error);

  useEffect(() => {
    if (selectedUser) {
      dispatch(fetchHomes({ userId: selectedUser, page: currentPage, take: itemsPerPage}));
    }
  }, [selectedUser, dispatch, currentPage]);

  if (error) return <p>Error loading homes</p>;

  const handleCardClick = (user) => {
    setSelectedUser1(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser1(null);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div style={gridStyle}>
        {homes?.data?.map((content) => (
          <HomeCard
            key={content.id}
            content={content}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>

      {homes?.data?.length>0 && <div style={paginationStyle}>
        <button
          style={buttonStyle}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={homes?.meta?.hasPreviousPage === false}
        >
          Previous
        </button>
        <span style={marginstyle}>
          Page {currentPage} of {homes?.meta?.pageCount}
        </span>
        <button
          style={buttonStyle}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={homes?.meta?.hasNextPage === false}
        >
          Next
        </button>
      </div>}

      {selectedUser1 && (
        <EditUserModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          content={selectedUser1}
          currentPage= {currentPage}
        />
      )}
    </>
  );
};

const marginstyle ={
  margin: '10px'
}

const gridStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
  flexWrap: "wrap",
};

const paginationStyle = {
  width: '100vw',
  display: "flex",
  justifyContent: "center",
  alignItems: 'center',
  margin: "0px 16px 16px 0px",
};

const buttonStyle = {
  width: "100px",
  height: "40px",
  background: "#808080",
  color: "white",
  fontWeight: "bold",
  borderRadius: "30px",
  border: "none",
  fontSize: "16px",
  boxShadow:
    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
};

export default CardLayout;
