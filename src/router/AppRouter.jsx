import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import MainLayout from '../layouts/MainLayout'

// Lazy load pages for better performance
const Home = React.lazy(() => import('../pages/Home'))
const Books = React.lazy(() => import('../pages/Books'))
const AddBook = React.lazy(() => import('../pages/AddBook'))
const Members = React.lazy(() => import('../pages/Members'))
const Borrow = React.lazy(() => import('../pages/Borrow'))
const Login = React.lazy(() => import('../pages/Login'))

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />
}

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }
  
  return !isAuthenticated ? children : <Navigate to="/" />
}

const AppRouter = () => {
  return (
    <BrowserRouter>
      <React.Suspense 
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          
          <Route path="/*" element={
            <ProtectedRoute>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/books" element={<Books />} />
                  <Route path="/add-book" element={<AddBook />} />
                  <Route path="/members" element={<Members />} />
                  <Route path="/borrow" element={<Borrow />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </MainLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default AppRouter