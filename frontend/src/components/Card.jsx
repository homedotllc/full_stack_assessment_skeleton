import { useDispatch, useSelector } from 'react-redux';
import { toggleModalState } from '../features/ui/uiSlice';
import PropTypes from 'prop-types';
import { setCurrentHome } from '../features/home/homeSlice';
import { fetchUsersByHome } from '../features/user/userThunks';
import HomeSkeleton from './HomeSkeleton';

const Card = ({ homeItem }) => {
  const dispatch = useDispatch();
  const homesLoading = useSelector((state) => state.home.homesLoading);

  const editUserHandler = (homeItem) => {
    dispatch(toggleModalState({ openModal: true }));
    dispatch(setCurrentHome({ homeItem }));
    dispatch(fetchUsersByHome({ homeId: homeItem.id }));
  };

  return (
    <>
      {!homesLoading ? (
        <div key={homeItem.id} className='w-80 h-auto bg-white border border-gray-100 shadow-lg content-start mx-4 my-2'>
          <div className="w-full h-auto flex flex-row justify-start items-center">
            <p className="text-xl font-medium px-4 py-2">{homeItem.street_address}</p>
          </div>
          <div className="w-full h-auto flex flex-col justify-start items-start text-md px-4 my-1">
            <p>ListPrice: {homeItem.list_price}</p>
            <p>State: {homeItem.state}</p>
            <p>Zip: {homeItem.zip}</p>
            <p>Sqft: {homeItem.sqft}</p>
            <p>Beds: {homeItem.beds}</p>
            <p>Baths: {homeItem.baths}</p>
          </div>
          <div className="w-full h-16 flex flex-row justify-start items-center my-1">
            <button
              className="w-auto h-auto bg-blue-500 rounded-md text-white font-medium flex flex-row justify-center items-center px-6 py-2 mx-4 hover:bg-blue-600"
              onClick={() => editUserHandler(homeItem)}
            >
              Edit User
            </button>
          </div>
        </div>
      ) : (
        <HomeSkeleton />
      )}
    </>
  );
};

Card.propTypes = {
  homeItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    street_address: PropTypes.string.isRequired,
    list_price: PropTypes.number.isRequired,
    state: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
    sqft: PropTypes.number.isRequired,
    beds: PropTypes.number.isRequired,
    baths: PropTypes.number.isRequired,
  }).isRequired,
};

export default Card;
