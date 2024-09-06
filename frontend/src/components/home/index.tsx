import React, { useEffect, useState } from "react";
import Card from "../select/card";
import DB from "../../assets/DemoDtate.json";

interface HomeProps {
  selected: string;
}

function Home({ selected }: HomeProps) {
  const [data, setData] = useState();

  useEffect(() => {
    if (selected) {
      setData(DB.filter((item) => item.username == selected));
    }
  }, [selected]);
  if (!data) return;

  return (
    <div className="flex flex-wrap gap-5">
      {data.map((item, i) => {
        return <Card key={i} {...{ ...item }} />;
      })}
    </div>
  );
}

export default Home;
