import { useAppSelector } from "@/app/hooks"
import { useEffect, useState } from "react"
import "react-loading-skeleton/dist/skeleton.css"
import { HomeInfo } from "./types"
import {
  useGetUserByHomeIdQuery,
  useUpdateUsersMutation
} from "./userHomeApiSlice"
import { selectAllUsers } from "./userHomeSlice"

interface MultiSelectCheckboxProps {
  homeInfo: HomeInfo
}

const MultiSelectCheckbox: React.FC<MultiSelectCheckboxProps> = ({
  homeInfo
}) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const allUsers = useAppSelector(selectAllUsers)
  const { data: selectedUsersData, isSuccess } = useGetUserByHomeIdQuery({
    homeId: homeInfo.id
  })
  const isNoItemSelected = !selectedItems.length

  const [updateUserIds, { isLoading }] = useUpdateUsersMutation()
  useEffect(() => {
    if (isSuccess && selectedUsersData) {
      setSelectedItems(selectedUsersData.result.map(item => item.id))
    }
  }, [isSuccess, selectedUsersData])

  const handleCheckboxChange = (id: number) => {
    setSelectedItems(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(itemId => itemId !== id)
        : [...prevSelected, id]
    )
  }

  const handleSubmit = async () => {
    try {
      if (isNoItemSelected) return
      await updateUserIds({
        homeId: homeInfo.id,
        userIds: selectedItems
      }).unwrap()
    } catch (error) {
      console.log("Error updating users", error)
    }
  }

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">
        Modify Users for: {homeInfo.street_address}
      </h2>
      {isNoItemSelected && (
        <p className="text-red-600">* select at least 1 user</p>
      )}

      <ul className="space-y-2">
        {allUsers.map(user => (
          <li key={user.id} className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={selectedItems.includes(user.id)}
              onChange={() => handleCheckboxChange(user.id)}
            />
            <label className="ml-2">{user.username}</label>
          </li>
        ))}
      </ul>
      <button
        onClick={handleSubmit}
        className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
          isLoading || isNoItemSelected ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading || isNoItemSelected}
      >
        {isLoading ? (isNoItemSelected ? "Submit" : "Updating...") : "Submit"}
      </button>
    </>
  )
}

export default MultiSelectCheckbox
