

const Card = () => {
  return (
    <div className='w-80 h-auto bg-white border-gray-200 shadow-2xl content-start mx-4 my-2'>
        <div className="w-full h-auto flex flex-row justify-start items-center">
          <p className="text-xl font-medium px-4 py-2">Title</p>
        </div>
        <div className="w-full h-auto flex flex-col justify-start items-start text-md px-4 my-1">
          <p>ListPrice: </p>
          <p>State: </p>
          <p>Zip: </p>
          <p>Sqft: </p>
          <p>Beds: </p>
          <p>Baths: </p>
        </div>
        <div className="w-full h-16 flex flex-row justify-start items-center my-1">
          <button className="w-auto h-auto bg-blue-500 rounded-md text-white font-medium flex flex-row justify-center items-center px-6 py-2 mx-4">Edit User</button>
        </div>
    </div>
  )
}

export default Card