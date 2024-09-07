interface PaginationProps {
  page: number
  totalPages: number
  onPrevious: () => void
  onNext: () => void
}

const Pagination = ({
  page,
  totalPages,
  onPrevious,
  onNext
}: PaginationProps) => {
  const hasNext = page < totalPages
  return (
    <div className="inline-flex items-center justify-center rounded bg-blue-600 py-1 text-white">
      <button
        className="inline-flex size-8 items-center justify-center rtl:rotate-180"
        onClick={onPrevious}
      >
        <span className="sr-only">Prev Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <span className="h-4 w-px bg-white/25" aria-hidden="true"></span>

      <div>
        <span className="h-8 w-12 px-4 items-center rounded border-none bg-transparent p-0 text-center text-xs font-medium [-moz-appearance:_textfield] focus:outline-none focus:ring-inset focus:ring-white [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none">
          {page}/{totalPages}
        </span>
      </div>

      <span className="h-4 w-px bg-white/25"></span>

      <button
        className={`inline-flex size-8 items-center justify-center rtl:rotate-180 ${
          !hasNext ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={onNext}
        disabled={!hasNext}
      >
        <span className="sr-only">Next Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}

export default Pagination
