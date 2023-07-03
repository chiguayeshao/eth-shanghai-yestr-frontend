import { useState, useEffect } from "react"

const useGetData = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url)

        if (response.ok) {
          const json = await response.json()
          setData(json)
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

  console.log(data, "data")

  return { data, loading, error }
}

export default useGetData
