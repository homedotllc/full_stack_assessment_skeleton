import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { toggleModalState } from "../features/ui/uiSlice"
import { useEffect, useState } from "react";
import { fetchHomesByUser, updateUsers } from "../features/home/homeThunks";


const Modal = () => {
  // use States
  const [selectedUsernames, setSelectedUsernames] = useState([]);

  const openModal = useSelector((state) => state.ui.openModal, shallowEqual);
  const currentHome = useSelector((state) => state.home.currentHome);
  console.log('currentHome : ', currentHome);

  const usersByHomeList = useSelector((state) => state.user.usersByHomeList);
  console.log('usersByHomeList in Modal : ', usersByHomeList);

  // Use useEffect to update selectedUsernames when usersByHomeList changes
  useEffect(() => {
    const userNamesList = usersByHomeList.map(usersByHomeItem => usersByHomeItem.username);
    console.log('userNamesList : ', userNamesList);
    setSelectedUsernames(userNamesList);
  }, [usersByHomeList]); // Dependency array

  const dispatch = useDispatch()

  // throw error if no user is selected
  const isSaveDisabled = selectedUsernames.length === 0;
  const currentUser = useSelector((state) => state.user.currentUser)
  const pageNumber = useSelector((state) => state.home.pageNumber)

  const handleSubmit = () => {
    console.log('selected users : ' , selectedUsernames)
    if(selectedUsernames.length >= 1){
      dispatch(toggleModalState({openModal : false} ))

      // update users 
      dispatch(updateUsers({homeId : currentHome.id , users : selectedUsernames})).then(() => {
        dispatch(fetchHomesByUser({userId : currentUser.id , page : pageNumber , limit : '50'}))  
      })
      setSelectedUsernames([]) 
    }
  }

  

  const handleCheckboxChange = (username) => {
    setSelectedUsernames((prevSelected) => {
      // Check if the username is already in the selected list
      if (prevSelected.includes(username)) {
        // If it's already selected, remove it (uncheck)
        return prevSelected.filter((item) => item !== username);
      } else {
        // If it's not selected, add it (check)
        return [...prevSelected, username];
      }
    });
  }


  return (
    <div className={`w-96 h-auto flex flex-col justify-start items-start border border-gray-200 drop-shadow-xl bg-white rounded-lg absolute ${openModal ? 'block top-1/2' : 'hidden'}`}>
        <div className="w-full h-auto py-4 px-4">
            <p className="text-lg font-medium text-black">Modify Users for: {currentHome?.street_address}</p>
        </div>
        <div className="w-full h-auto flex flex-col justify-center items-start">
            {usersByHomeList.map((usersByHomeItem) => (
              <div key = {usersByHomeItem.id} className="w-full h-10 flex flex-row justify-start items-center mx-4 -my-1" >
                <input type = "checkbox" className="mx-2 accent-blue-500" onChange={() => handleCheckboxChange(usersByHomeItem.username)} checked={selectedUsernames.includes(usersByHomeItem.username)} />
                <label>{usersByHomeItem.username}</label><br></br>
            </div>
            ))}
        </div>
        <div className="w-full h-14 flex flex-row justify-end items-center -mx-4">
            <button className="w-auto h-auto py-2 px-4 bg-gray-300 text-black rounded-lg mx-2 hover:bg-gray-400" onClick={() => dispatch(toggleModalState({openModal : false}))}>Cancel</button>
            <button className={`w-auto h-auto py-2 px-4 text-white rounded-lg font-medium ${isSaveDisabled ? 'bg-blue-200' : 'bg-blue-500 hover:bg-blue-600'}`} onClick={(e) => handleSubmit(e)} disabled = {isSaveDisabled}>Save</button>
        </div>
    </div> 
  )
}


export default Modal