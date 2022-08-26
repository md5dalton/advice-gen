import { useState, useEffect } from "react"

export default (url, OPTIONS, dependency = null) => {

    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        setIsLoading(true)
        
        fetch(url, OPTIONS)
            .then(res => res.json())
            .then(data => {
                setData(data)
                setError(null)
            })
            .catch(err => {
                setData([])
                setError(err.message)
            })
            .finally(() => setIsLoading(false))

    }, [dependency])

    return { data, error, isLoading }

}