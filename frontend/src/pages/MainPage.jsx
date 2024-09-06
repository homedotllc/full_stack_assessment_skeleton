import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Card from "../components/Card";
import Modal from "../components/Modal";
import { fetchAllUsers } from "../features/user/userThunks";
import { useEffect } from "react";
import { fetchHomesByUser } from "../features/home/homeThunks";
import { decrementPageNumber, incrementPageNumber, resetHomesList } from "../features/home/homeSlice";
import { setCurrentUser } from "../features/user/userSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.userList, shallowEqual);
  const homesList = useSelector((state) => state.home.homesList, shallowEqual);

  const pageNumber = useSelector((state) => state.home.pageNumber)

  useEffect(() => {
    console.log('Dispatching fetchAllUsers');
    dispatch(fetchAllUsers());
  }, [dispatch , homesList]);   

  const currentUser = useSelector((state) => state.user.currentUser)
  const totalPages = useSelector((state) => state.home.totalPages)

  const handleSelectHandler = (e) => {
    const option = e.target.value
    if(option != 'None'){
      const user = userList.find(userItem => userItem.username === option)
      dispatch(setCurrentUser({currentUser : user}))
      dispatch(fetchHomesByUser({userId : user.id , page : pageNumber , limit : '50'}))
    }else{
      dispatch(resetHomesList())
      console.log('Noting to show')
    }
  }

  const paginationHandler = (operation) => {
    if(operation === 'increment'){
      if(pageNumber + 1 <= totalPages){
        dispatch(fetchHomesByUser({userId : currentUser.id , page : pageNumber + 1 , limit : '50'}))
        dispatch(incrementPageNumber())
      } 
    }else if(operation === 'decrement'){ 
      dispatch(fetchHomesByUser({userId : currentUser.id , page : pageNumber - 1 , limit : '50'}))
      dispatch(decrementPageNumber())
    }
  }

  return (
    <div className='w-screen h-screen overflow-y-scroll scroll-smooth flex flex-col justify-start items-center bg-white'>
      
      <div className="w-full h-16 flex flex-row justify-center items-center py-2">
        <div className="w-3/4 h-full flex flex-row justify-center items-center">
            { currentUser ? <div className="w-auto h-full flex flex-row justify-center items-center">
                <button className="w-auto h-10 flex flex-row justify-center items-center bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg px-6" onClick={() => paginationHandler('decrement')}>Prev</button>
                <p>&nbsp; Page: {pageNumber} &nbsp;</p>
                <button className="w-auto h-10 flex flex-row justify-center items-center bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg px-6" onClick={() => paginationHandler('increment')}>Next</button>
            </div> : null }
        </div>

        <div className="w-1/4 h-full flex flex-row justify-end items-center mx-28 my-10">
          <label className="mx-2">Select from:</label>
          <select className="w-24 h-10 rounded-lg border border-gray-300" onChange={(e) => handleSelectHandler(e)}>
            <option>None</option>
            {userList.map((userItem) => (
              <option key={userItem.id}>{userItem.username}</option>
            ))}
          </select>
        </div>
      </div>
      <Modal />
      <div className="w-full h-full flex flex-wrap content-start py-4 px-14">
        {
          homesList.length > 0 ? homesList.map((homeItem) => (
            <Card key = {homeItem.id} homeItem = {homeItem} />
          )) : 
          <div className="w-full h-full flex flex-row justify-center items-center">
              <p>Nothing to show</p>
          </div>
        }
      </div>
    </div>
  );
};

export default MainPage;
