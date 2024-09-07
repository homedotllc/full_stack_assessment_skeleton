import React, { useState } from "react";
import Header from "../components/Header";
import Home from "../components/home";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Skeleton from "react-loading-skeleton";

function Homepage() {
  const [selected, setSelected] = useState<string>("");
  const {
    app: { isLoading, error },
  } = useSelector((state: RootState) => state);

  if (error) return "Something went wrong!!!";

  return (
    <div>
      <Header {...{ setSelected, selected }} />
      {isLoading ? (
        <div className="wrapper">
          <Skeleton
            count={1}
            // wrapper={Box}
            className="w-[200px] h-4 p-5 rounded-lg shadow-md text-left flex flex-wrap"
          />
        </div>
      ) : selected ? (
        <Home {...{ selected }} />
      ) : (
        <p>Nothing to Show...</p>
      )}
    </div>
  );
}

export default Homepage;
