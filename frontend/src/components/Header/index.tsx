import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useGetAllUsersQuery } from "@/features/userHome/userHomeApiSlice"
import {
  selectAllUsers,
  setAllUsers,
  setUserId
} from "@/features/userHome/userHomeSlice"
import { useEffect } from "react"
import Dropdown from "../Dropdown"

const Header = () => {
  const dispatch = useAppDispatch()
  const { data } = useGetAllUsersQuery()
  useEffect(() => {
    if (data) {
      dispatch(setAllUsers(data.result))
    }
  }, [data, dispatch])

  const allUsers = useAppSelector(selectAllUsers)

  return (
    <header className="sticky bg-white top-0 z-999 w-full shadow-md drop-shadow-10">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="">Title here</span>
            {/* <img
              alt=""
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            /> */}
          </a>
        </div>

        <div className="flex flex-1 justify-end">
          <Dropdown
            onChange={e => dispatch(setUserId(e))}
            options={allUsers.map(({ username, id }) => ({
              label: username,
              value: id
            }))}
          />
        </div>
      </nav>
    </header>
  )
}

export default Header
