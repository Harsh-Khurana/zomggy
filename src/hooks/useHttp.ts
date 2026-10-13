import { useCallback, useEffect, useState } from "react"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"

export async function sendRequest(url: string, config: RequestInit) {
  const resp = await fetch(url, config)

  const data = await resp.json()

  if (!resp.ok) {
    throw new Error(data.message)
  }

  return data
}

export default function useHttp<T>(path: string, config: RequestInit, initialValue: T) {
  const [data, setData] = useState(initialValue)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  function clearData() {
    setData(initialValue)
  }

  const sendHttpRequest = useCallback(
    async function (bodyData?: BodyInit | null) {
      setError("")
      setIsLoading(true)
      try {
        const resp = await fetch(`${API_BASE_URL}/${path}`, { ...config, body: bodyData })

        const data = await resp.json()

        if (!resp.ok) {
          throw new Error(data.message)
        }
        setData(data)
      } catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong"
        setError(message)
      }
      setIsLoading(false)
    },
    [config, path],
  )

  useEffect(() => {
    if (!config || (config && (config.method === "GET" || !config.method))) {
      sendHttpRequest()
    }
  }, [config, sendHttpRequest])

  return {
    data,
    error,
    isLoading,
    sendHttpRequest,
    clearData,
  }
}
