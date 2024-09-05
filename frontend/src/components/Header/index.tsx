import { useAppDispatch } from "@/app/hooks"
import { useGetAllUsersQuery } from "@/features/userHome/userHomeApiSlice"
import { setUserId } from "@/features/userHome/userHomeSlice"
import Dropdown from "../Dropdown"

const Header = () => {
  const dispatch = useAppDispatch()
  const { data: users, isSuccess } = useGetAllUsersQuery()

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
            options={
              !isSuccess
                ? []
                : users.result.map(({ username, id }) => ({
                    label: username,
                    value: id
                  }))
            }
          />
        </div>
      </nav>
    </header>
  )
}

export default Header
