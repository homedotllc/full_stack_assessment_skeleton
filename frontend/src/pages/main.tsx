import React, { useState } from "react";
import Header from "../components/Header";
import Home from "../components/home";

function Homepage() {
  const [selected, setSelected] = useState<string>("");
  return (
    <div>
      <Header {...{ setSelected, selected }} />
      {selected ? <Home {...{ selected }} /> : <p>Nothing to Show...</p>}
    </div>
  );
}

export default Homepage;
