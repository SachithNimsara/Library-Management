import React from 'react'

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <img src="/src/assets/logo.png" alt="Logo" className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">
              {import.meta.env.VITE_APP_NAME}
            </h1>
            <p className="text-gray-600 mt-2">Manage your library efficiently</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout