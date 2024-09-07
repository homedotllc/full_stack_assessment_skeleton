import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toggleModalState } from "../features/ui/uiSlice";
import { useEffect, useRef, useState } from "react";
import { fetchHomesByUser, updateUsers } from "../features/home/homeThunks";


const Modal = () => {
  // use States
  const [selectedUsernames, setSelectedUsernames] = useState([]);
  const modalRef = useRef(null);

  // useSelectors
  const openModal = useSelector((state) => state.ui.openModal, shallowEqual);
  const currentHome = useSelector((state) => state.home.currentHome);
  const usersByHomeList = useSelector((state) => state.user.usersByHomeList);

  // dispatch
  const dispatch = useDispatch();

  // hooks
  useEffect(() => {
    const userNamesList = usersByHomeList.map(usersByHomeItem => usersByHomeItem.username);
    setSelectedUsernames(userNamesList);
  }, [usersByHomeList]);

  // focus modal when it opens
  useEffect(() => {
    if (openModal && modalRef.current) {
      modalRef.current.focus();
    }
  }, [openModal]);

  // throw error if no user is selected
  const isSaveDisabled = selectedUsernames.length === 0;
  const currentUser = useSelector((state) => state.user.currentUser);
  const pageNumber = useSelector((state) => state.home.pageNumber);

  // functions
  const handleSubmit = () => {
    if(selectedUsernames.length >= 1){
      dispatch(toggleModalState({openModal : false} ));

      // update users 
      dispatch(updateUsers({homeId : currentHome.id , users : selectedUsernames})).then(() => {
        dispatch(fetchHomesByUser({userId : currentUser.id , page : pageNumber , limit : '50'}));  
      });
      setSelectedUsernames([]);
    }

    if(isSaveDisabled){
      console.log("error , select atleast one");
    }
  };

  const handleCheckboxChange = (username) => {
    setSelectedUsernames((prevSelected) => {
      // Check if the username is already in the selected list
      if (prevSelected.includes(username)) {
        return prevSelected.filter((item) => item !== username);
      } else {
        return [...prevSelected, username];
      }
    });
  };

  return (
    <>
      {/* overlay */}
      {openModal && <div className="fixed inset-0 bg-gray-800 opacity-75 z-40"></div>}
      
      {/* modal */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`w-96 h-auto flex flex-col justify-start items-start border border-gray-200 drop-shadow-xl bg-white rounded-lg absolute z-50 ${openModal ? 'block top-1/4 bg-gray-300' : 'hidden'}`}
      >
        <div className="w-full h-auto py-4 px-4">
          <p className="text-lg font-medium text-black">Modify Users for: {currentHome?.street_address}</p>
        </div>
        <div className="w-full h-auto flex flex-col justify-center items-start">
          {usersByHomeList.map((usersByHomeItem) => (
            <div key={usersByHomeItem.id} className="w-full h-10 flex flex-row justify-start items-center mx-4 -my-1">
              <input type="checkbox" className="mx-2 accent-blue-500" onChange={() => handleCheckboxChange(usersByHomeItem.username)} checked={selectedUsernames.includes(usersByHomeItem.username)} />
              <label>{usersByHomeItem.username}</label><br></br>
            </div>
          ))}
        </div>
        <div className="w-full h-auto flex flex-row justify-center items-center">
          {isSaveDisabled ? <div className="w-auto h-16 flex flex-row justify-center items-center bg-red-600 px-4 rounded-lg text-white font-medium">Error: Select at least one User</div> : null}
        </div>
        <div className="w-full h-14 flex flex-row justify-end items-center -mx-4">
          <button className="w-auto h-auto py-2 px-4 bg-gray-300 text-black rounded-lg mx-2 hover:bg-gray-400" onClick={() => dispatch(toggleModalState({ openModal: false }))}>Cancel</button>
          <button className={`w-auto h-auto py-2 px-4 text-white rounded-lg font-medium ${isSaveDisabled ? 'bg-blue-200' : 'bg-blue-500 hover:bg-blue-600'}`} onClick={(e) => handleSubmit(e)} disabled={isSaveDisabled}>Save</button>
        </div>
      </div>
    </>
  );
}

export default Modal;
