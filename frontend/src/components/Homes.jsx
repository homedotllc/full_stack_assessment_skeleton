import PropTypes from "prop-types";
import { useGetHomesByUserQuery } from "../store/slices/apiSlice";
import Home from "./Home";
import Spinner from './Spinner';

const Homes = (props) => {
  const user = props.selectedUser;
  const userId = user.id;

  const {
    data: homes,
    error,
    isLoading,
  } = useGetHomesByUserQuery(
    userId,
    { skip: !user } // Skip query if no user is selected
  );

  if (isLoading) return <Spinner />;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <div className="mt-4">
      <ul className="list-none flex flex-wrap justify-center gap-8">
        {homes.map((home) => (
          <Home key={home.id} home={home} />
        ))}
      </ul>
    </div>
  );
};

Homes.prototype = {
  selectedUser: PropTypes.object.isRequired,
};

export default Homes;
