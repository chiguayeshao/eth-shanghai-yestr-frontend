import { useState, useEffect } from "react"

const useGetData = (url) => {
  const [getData, setGetData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url)

        if (response.ok) {
          const json = await response.json()
          setGetData(json)
        } else {
          throw new Error("Error fetching data")
        }
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { getData, loading, error }
}

export default useGetData
