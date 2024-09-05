import { useAppDispatch } from "@/app/hooks"
import { setQuoteLimit } from "@/features/quotes/quotesApiSlice"
import Dropdown from "../Dropdown"
const options = [
  { label: "Select count (5)", value: 5 },
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "15", value: 15 },
  { label: "20", value: 20 }
]
const Header = () => {
  // const [selectUser, setSelectUser] = useState(5)
  // console.log(selectUser)
  const dispatch = useAppDispatch()

  return (
    // <header className="absolute inset-x-0 top-0 z-50">
    <header className="sticky top-0 z-999 w-full drop-shadow-10">
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
            onChange={e => dispatch(setQuoteLimit(e))}
            options={options}
          />
        </div>
      </nav>
    </header>
  )
}

export default Header
