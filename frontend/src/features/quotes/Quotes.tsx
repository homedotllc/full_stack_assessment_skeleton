import Card from "@/components/Card"
import { useState } from "react"
import styles from "./Quotes.module.css"
import { useGetQuotesQuery } from "./quotesApiSlice"

const options = [5, 10, 20, 30]

export const Quotes = () => {
  const [numberOfQuotes, setNumberOfQuotes] = useState(10)
  // Using a query hook automatically fetches data and returns query values
  const { data, isError, isLoading, isSuccess } =
    useGetQuotesQuery(numberOfQuotes)

  if (isError) {
    return (
      <div>
        <h1>There was an error!!!</h1>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className={styles.container}>
        <h3>Select the Quantity of Quotes to Fetch:</h3>
        <select
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
        </select>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-4 xl:grid-cols-4 2xl:gap-7.5">
          {data.quotes.map(({ author, quote, id }) => (
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

  return null
}
