import React, { useEffect, useState } from 'react'
import { selectConfirmItem } from '../store/confirm-slice'

const StatusTracker = () => {
  const [statusArray, setStatusArray] = useState([])
  const [progress, setProgress] = useState(0)
  const confirmItem = useSelector(selectConfirmItem)

  useEffect(() => {
    // Simulating an API call to fetch status data
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/status')
        const data = await response.json()

        // Assuming the API returns an array of status values
        setStatusArray(data)
      } catch (error) {
        console.error('Error fetching status data:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    // Periodically update the progress based on status values
    const intervalId = setInterval(() => {
      setProgress(prevProgress => {
        const nextIndex = (prevProgress + 1) % statusArray.length
        return nextIndex
      })
    }, 3000) // Update every 3 seconds

    return () => clearInterval(intervalId) // Cleanup on component unmount
  }, [statusArray])

  const currentStatus = statusArray.length > 0 ? statusArray[progress] : ''

  return (
    <div>
      <h1>Status Tracker</h1>
      <div>
        <p>Current Status: {currentStatus}</p>
        <div className="progress-bar" style={{ width: `${(progress + 1) * 20}%` }} />
        <p>Progress: {((progress + 1) * 20).toFixed(0)}%</p>
      </div>
    </div>
  )
}

export default StatusTracker
