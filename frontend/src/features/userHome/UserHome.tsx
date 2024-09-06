import { useAppSelector } from "@/app/hooks"
import Card from "@/components/Card"
import Dialog from "@/components/Dialog"
import { useState } from "react"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import MultiSelectCheckbox from "./MultiCheckBox"
import { HomeInfo } from "./types"
import { useGetHomeByUserIdQuery } from "./userHomeApiSlice"
import { selectUserId } from "./userHomeSlice"

export const UserHome = () => {
  const userId = useAppSelector(selectUserId)
  const { data, isError, isLoading, isSuccess } = useGetHomeByUserIdQuery({
    userId
  })
  const [selectedHomeInfo, setSelectedHomeInfo] = useState<HomeInfo | null>(
    null
  )
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleOpenDialog = (homeInfo: HomeInfo) => {
    setSelectedHomeInfo(homeInfo)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedHomeInfo(null)
  }

  return (
    <>
      <Dialog isOpen={isDialogOpen} onClose={handleCloseDialog}>
        {selectedHomeInfo && (
          <>
            <MultiSelectCheckbox homeInfo={selectedHomeInfo} />
            <button
              onClick={handleCloseDialog}
              className="mt-4 ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </>
        )}
      </Dialog>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-4 xl:grid-cols-4 2xl:gap-7.5">
        {isError && (
          <div>
            <h1>There was an error!!!</h1>
          </div>
        )}

        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <div className="p-6 flex-grow">
                <Skeleton className="p-4 mb-2" />
                <Skeleton />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="col-span-1">
                    <Skeleton />
                    <Skeleton />
                  </div>
                  <div className="col-span-1">
                    <Skeleton />
                    <Skeleton />
                  </div>
                  <div className="col-span-1">
                    <Skeleton />
                    <Skeleton />
                  </div>
                  <div className="col-span-1">
                    <Skeleton />
                    <Skeleton />
                  </div>
                </div>
                <Skeleton className="mt-6 bg-blue-500 text-white py-2" />
              </div>
            </Card>
          ))}
        {isSuccess &&
          data.result.map(item => (
            <Card key={item.id}>
              <div className="p-6 flex-grow">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {item.street_address}
                </h2>
                <p className="text-gray-600">
                  {item.state}, {item.zip}
                </p>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="col-span-1">
                    <span className="block font-semibold text-gray-600">
                      Square Feet:
                    </span>
                    <span className="block text-gray-800">
                      {item.sqft} sqft
                    </span>
                  </div>
                  <div className="col-span-1">
                    <span className="block font-semibold text-gray-600">
                      Price:
                    </span>
                    <span className="block text-gray-800">
                      ${item.list_price.toLocaleString()}
                    </span>
                  </div>
                  <div className="col-span-1">
                    <span className="block font-semibold text-gray-600">
                      Beds:
                    </span>
                    <span className="block text-gray-800">{item.beds}</span>
                  </div>
                  <div className="col-span-1">
                    <span className="block font-semibold text-gray-600">
                      Baths:
                    </span>
                    <span className="block text-gray-800">{item.baths}</span>
                  </div>
                </div>

                <button
                  className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                  onClick={() => handleOpenDialog(item)}
                >
                  Edit Users
                </button>
              </div>
            </Card>
          ))}
      </div>
    </>
  )
}
