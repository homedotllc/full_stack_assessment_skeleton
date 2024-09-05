import { useDispatch, useSelector } from "react-redux"
import { toggleModalState } from "../features/ui/uiSlice"

const Modal = () => {
  const openModal = useSelector((state) => state.ui.openModal)

  const dispatch = useDispatch()
  return (
    <>
    { openModal ?
            <div className={`w-96 h-auto flex flex-col justify-start items-start bg-white rounded-lg absolute ${openModal ? 'block top-1/2' : 'none'}`}>
            <div className="w-full h-auto py-4 px-4">
                <p className="text-lg font-medium text-black">Modify Users for: Title</p>
            </div>
            <div className="w-full h-auto flex flex-col justify-center items-start">
                <div className="w-full h-10 flex flex-row justify-start items-center mx-4">
                <input type = "checkbox" className="mx-2 accent-blue-500" id = "vehicle" name = "vehicle1" value = "Bike" />
                <label htmlFor="vehicle1"> I have a bike</label><br></br>
                </div>
            </div>
            <div className="w-full h-14 flex flex-row justify-end items-center -mx-4">
                <button className="w-auto h-auto py-2 px-4 bg-gray-300 text-black rounded-lg mx-2 hover:bg-gray-400" onClick={() => dispatch(toggleModalState({openModal : false}))}>Cancel</button>
                <button className="w-auto h-auto py-2 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600">Save</button>
            </div>
        </div> : null 
    }
    </>
  )
}

export default Modal