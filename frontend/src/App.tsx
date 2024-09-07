import "./App.css";
import "react-loading-skeleton/dist/skeleton.css";
import Homepage from "./pages/main";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUsers } from "./redux/slice/user";
import { useGetUsersQuery } from "./redux/slice/api";
import { setError, setLoading } from "./redux/slice/app";

function App() {
  const { data: users, isLoading, error } = useGetUsersQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (users)
      dispatch(
        setUsers([
          { label: "None", value: "" },
          ...users.map((item) => ({
            label: item.username,
            value: item.username,
          })),
        ])
      );

    dispatch(setLoading(isLoading));
    if (error) dispatch(setError(error));
    else dispatch(setError(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, isLoading, error]);

  return (
    <>
      <Homepage />
    </>
  );
}

export default App;
