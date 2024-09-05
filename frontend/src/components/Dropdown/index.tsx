interface Option<T> {
  value: T
  label: string
}

interface DropdownProps<T> {
  options: Option<T>[]
  onChange: (value: T) => void
}

const Dropdown = <T,>({ options, onChange }: DropdownProps<T>) => {
  return (
    <div className="flex">
      <select
        onChange={e => onChange(options[e.target.selectedIndex].value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
