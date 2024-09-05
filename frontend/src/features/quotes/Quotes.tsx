import { useAppSelector } from "@/app/hooks"
import Card from "@/components/Card"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import styles from "./Quotes.module.css"
import { selectQuoteLimit, useGetQuotesQuery } from "./quotesApiSlice"

export const Quotes = () => {
  // const [numberOfQuotes, setNumberOfQuotes] = useState(10)
  // Using a query hook automatically fetches data and returns query values
  const quotLimit = useAppSelector(selectQuoteLimit)
  const { data, isError, isLoading, isSuccess } = useGetQuotesQuery(quotLimit)
  return (
    <div className={styles.container}>
      <h3>Select the Quantity of Quotes to Fetch:</h3>
      {/* <select
        className={styles.select}
        value={numberOfQuotes}
        onChange={e => {
          setNumberOfQuotes(Number(e.target.value))
        }}
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select> */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-4 xl:grid-cols-4 2xl:gap-7.5">
        {isError && (
          <div>
            <h1>There was an error!!!</h1>
          </div>
        )}

        {isLoading &&
          Array.from({ length: 12 }).map((_, index) => (
            <div key={index}>
              <Skeleton className="py-2 mb-2" />
              <Skeleton count={5} />
            </div>
          ))}
        {/* {Array.from({ length: 12 }).map((_, index) => (
          <div key={index}>
            <Skeleton className="py-2 mb-2" />
            <Skeleton count={5} />
          </div>
        ))} */}
        {isSuccess &&
          data.quotes.map(({ author, quote, id }) => (
            <Card key={id}>
              <blockquote className="mb-2">
                &ldquo;{quote}&rdquo;
                <footer>
                  <cite>{author}</cite>
                </footer>
              </blockquote>
              <div className="flex gap-3">
                <a
                  className="inline-block rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
                  href="#"
                >
                  Download
                </a>

                {/* Border */}

                <a
                  className="inline-block rounded border border-current px-4 py-2 text-sm font-medium text-indigo-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
                  href="#"
                >
                  Download
                </a>
              </div>
            </Card>
          ))}
      </div>
    </div>
  )
}
