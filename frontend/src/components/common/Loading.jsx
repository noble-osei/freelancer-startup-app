import React from 'react'

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-4 text-base-content/70">Loading...</p>
      </div>
    </div>
  )
}

export default Loading