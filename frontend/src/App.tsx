import "./App.css";
import Homepage from "./pages/main";
import data from "../src/assets/DemoDtate.json";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUsers } from "./redux/slice/user";

const userOptions = [...new Set(data.map((item) => item.username))].map(
  (item) => ({
    value: item,
    label: item,
  })
);
userOptions.unshift({ label: "None", value: "" });

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUsers(userOptions));
  }, []);

  return (
    <>
      <Homepage />
    </>
  );
}

export default App;
