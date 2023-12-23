import React from 'react'

const VerticalProgressBar = ({ status }) => {
  const calculateProgress = () => {
    // Assume a simple mapping from status to progress percentage
    switch (status) {
      case 'Pending':
        return 25
      case 'In Progress':
        return 50
      case 'Completed':
        return 100
      default:
        return 0
    }
  }

  const progress = calculateProgress()
  const barHeight = `${progress}%`

  return (
    <div
      style={{
        height: '200px', // Total height of the progress bar
        width: '20px', // Width of the progress bar
        backgroundColor: '#f0f0f0', // Background color
        position: 'relative'
      }}
    >
      <div
        style={{
          height: barHeight,
          width: '100%',
          backgroundColor: '#3498db', // Color of the progress
          position: 'absolute',
          bottom: '0',
          transition: 'height 0.3s ease' // Smooth transition effect
        }}
      />
    </div>
  )
}

export default VerticalProgressBar
