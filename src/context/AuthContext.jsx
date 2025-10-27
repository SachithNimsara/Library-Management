import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock login function - no API needed
  const login = async (email, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // For demo purposes, accept any email/password
    // In real app, you'd validate credentials
    if (email && password) {
      const mockUser = {
        id: 1,
        name: 'Library Admin',
        email: email,
        role: 'admin'
      }
      setUser(mockUser)
      localStorage.setItem('token', 'mock-jwt-token')
      localStorage.setItem('user', JSON.stringify(mockUser))
      return { user: mockUser, token: 'mock-jwt-token' }
    } else {
      throw new Error('Please enter both email and password')
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  useEffect(() => {
    // Check if user is logged in from localStorage
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}