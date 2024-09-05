import Card from "../components/Card"
import Modal from "../components/Modal"

const options = [
  "user1",
  "user2"
]

const MainPage = () => {
  return (
    <div className='w-screen h-screen overflow-hidden flex flex-col justify-start items-center bg-white'>
        <div className="w-full h-16 flex flex-row justify-end items-center py-2">
            <label className="-mx-16">Select from:</label>
            <select className="w-24 h-10 mx-20 rounded-lg border border-gray-300">
              <option>None</option>
              {
                options.map((option , index) => (
                  <option key = {index}>{option}</option>
                ))
              }
            </select>
        </div>
        <Modal />
        <div className="w-full h-full flex flex-wrap content-start py-4 px-14">
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