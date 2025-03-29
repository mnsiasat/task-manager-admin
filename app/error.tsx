'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 text-white">
      <div className="text-center max-w-md p-6 border border-gray-800 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mt-4">Oops! Something went wrong.</h1>
        <p className="text-gray-400 mt-2">
          The page you are looking for might be unavailable or has encountered an error.
        </p>
      </div>
    </div>
  )
}
