import Card from "../components/Card"

const options = [
  "user1",
  "user2"
]

const MainPage = () => {
  return (
    <div className='w-screen h-screen overflow-hidden flex flex-col justify-start items-center bg-orange-500'>
        <div className="w-full h-16 flex flex-row justify-end items-center bg-purple-500 py-2">
            <select className="w-60 h-10 mx-20 rounded-lg">
              <option>None</option>
              {
                options.map((option , index) => (
                  <option key = {index}>{option}</option>
                ))
              }
            </select>
        </div>
        <div className="w-full h-full flex flex-wrap content-start bg-yellow-500 py-4 px-14">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    </div>
  )
}

export default MainPage