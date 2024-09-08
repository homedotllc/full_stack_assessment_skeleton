import React, { useState } from "react";
import { Home, useGetHomesByUserIdQuery } from "../services/homeApis";
import Modal from "./Modal";
import { User } from "../services/usersApi";
interface HomeProps{
    userId: number;
    users: User[] ;
}

const HomeList: React.FC<HomeProps> = ({userId, users}) => {
    const [selectedHome, setSelectedHome] = useState<Home | null>(null);
    const [isModalOpen, setIsModalOpen]=useState(false);

    const {data: homes, error, isLoading} = useGetHomesByUserIdQuery(userId);
    if(isLoading)   return <p> loading homes</p>;
    if(error)   return <p> Failed to load homes </p>;

    const openModal = (home: Home) => {
        setSelectedHome(home);
        setIsModalOpen(true);
    }
    
    const closeModal = () =>{ 
        setIsModalOpen(false);
        setSelectedHome(null);
    }
    return(
        <div>
            <div className="flex flex-wrap justify-center">
                {homes?.map((home) => (
                    <div className="w-80 h-50 rounded shadow-lg p-6 bg-white m-4">
                    <div className="font-bold text-xl mb-2 break-words">{home.street_address}</div>
                      <p className="text-gray-700 text-base break-words">List Price: ${home.list_price}</p>
                      <p className="text-gray-700 text-base break-words">State: {home.state}</p>
                      <p className="text-gray-700 text-base break-words">Zip: {home.zip}</p>
                      <p className="text-gray-700 text-base break-words">Sqft: {home.sqft}</p>
                      <p className="text-gray-700 text-base break-words">Beds: {home.beds}</p>
                      <p className="text-gray-700 text-base break-words">Baths: {home.baths}</p>
                      <button className="mt-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        id="mybutton"
                        onClick={()=>openModal(home)}
                      >
                        Edit User
                      </button>
                  </div>
                ))}
            </div>
            {isModalOpen && selectedHome&& (
                <Modal isOpen={isModalOpen} onClose={closeModal} home={selectedHome} users={users}/>
            )}
        </div>
    )

}

export default HomeList;
export {};
