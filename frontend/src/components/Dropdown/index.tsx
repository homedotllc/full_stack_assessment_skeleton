interface Option<T> {
  value: T
  label: string
}

interface DropdownProps<T> {
  id: string
  label: string
  options: Option<T>[]
  onChange: (value: T) => void
}

const Dropdown = <T,>({ id, label, options, onChange }: DropdownProps<T>) => {
  return (
    <div className="flex items-center space-x-2 w-full max-w-md">
      <label
        className="block text-sm font-medium text-gray-700 whitespace-nowrap"
        htmlFor={id}
      >
        {label}
      </label>
      <select
        id={id}
        onChange={e => onChange(options[e.target.selectedIndex].value)}
        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value as unknown as string}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown
