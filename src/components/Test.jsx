import React from 'react'

export default function Test() {
    return (
        <div className="bg-gray-100 h-screen flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg max-w-sm">
            <h2 className="text-2xl font-bold mb-4">Welcome to Tailwind CSS</h2>
            <p className="text-gray-700">
              Tailwind CSS is a utility-first CSS framework for quickly building custom designs. This component demonstrates some of Tailwind's utility classes.
            </p>
            <div className="mt-6">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Learn More
              </button>
            </div>
          </div>
        </div>
      );
}
