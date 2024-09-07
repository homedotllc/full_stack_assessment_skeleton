import React from "react";
import Card from "../select/card";
import { useGetHomesByUserQuery } from "../../redux/slice/api";
import Skeleton from "react-loading-skeleton";

interface HomeProps {
  selected: string;
}

function Home({ selected }: HomeProps) {
  const {
    data: homes,
    isLoading,
    isError,
    // error,
  } = useGetHomesByUserQuery(selected, {
    skip: !selected,
  });

  if (isError) return "Something happened...";

  return (
    <div className="flex flex-wrap gap-5 justify-between">
      {isLoading ? (
        <div className="wrapper">
          <Skeleton
            count={8}
            // wrapper={Box}
            className="h-[288px] w-[225px] p-5 rounded-lg shadow-md text-left flex flex-wrap"
          />
        </div>
      ) : (
        homes?.map((item) => {
          return <Card key={item.street_address} {...{ ...item }} />;
        })
      )}
    </div>
  );
}

export default Home;
