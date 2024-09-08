import React from "react";
import "./App.css";
import Users from "./components/Users";

// interface homeData{
//   id: number,
//   address: string,
//   price: number,
//   state: string,
//   zip: number,
//   sqft: number,
//   beds: number,
//   baths: number
// }

// interface HomeCardsProps{
//   homes: homeData[];
// }
// interface HomePageDataProps{
//   homes: homeData[];
// }
// function HomeCard({home}: {home: homeData}){
//   return (
//     <div className="max-w-sm rounded overflow-hidden shadow-lg p-6 bg-white m-4">
//       <div className="font-bold text-xl mb-2">{home.address}</div>
//         <p className="text-gray-700 text-base">List Price: ${home.price}</p>
//         <p className="text-gray-700 text-base">State: {home.state}</p>
//         <p className="text-gray-700 text-base">Zip: {home.zip}</p>
//         <p className="text-gray-700 text-base">Sqft: {home.sqft}</p>
//         <p className="text-gray-700 text-base">Beds: {home.beds}</p>
//         <p className="text-gray-700 text-base">Baths: {home.baths}</p>
//         <button className="mt-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
//           Edit User
//         </button>
//     </div>
//   );
// }

// function SearchBar() {
//   return (
//     <form className="flex justify-end items-center mb-6 mt-4 mr-4">
//       <label htmlFor="users" className='mr-4'>
//         <h3 className="text-lg font-semibold text-gray-700">Select user: </h3>
//       </label>
//       <select
//         name="users"
//         id="users"
//         className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//       >
//         <option value="user1">user1</option>
//         <option value="user2">user2</option>
//         <option value="user3">user3</option>
//       </select>
//     </form>
//   );
// }

function App() {
  return (
    <div className="App">
      <Users />
      {/* <UpdateHomeUsers homeId={homeId} currentUsers={currentUsers} /> */}
    </div>
  );
  // return (
  //   <div className="App">
  //     <HomePageData homes={HOMES}/>
  //   </div>
  // );
}

export default App;
