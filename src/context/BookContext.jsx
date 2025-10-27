import React, { createContext, useContext, useState, useEffect } from 'react'

const BookContext = createContext()

export const useBooks = () => {
  const context = useContext(BookContext)
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider')
  }
  return context
}

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Mock book data
  const mockBooks = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '9780743273565',
      publishedYear: 1925,
      totalCopies: 5,
      availableCopies: 3,
      status: 'available',
      description: 'A classic novel of the Jazz Age'
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      isbn: '9780061120084',
      publishedYear: 1960,
      totalCopies: 3,
      availableCopies: 1,
      status: 'available',
      description: 'A gripping tale of racial injustice'
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      isbn: '9780451524935',
      publishedYear: 1949,
      totalCopies: 4,
      availableCopies: 0,
      status: 'borrowed',
      description: 'Dystopian social science fiction novel'
    },
    {
      id: 4,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      isbn: '9780141439518',
      publishedYear: 1813,
      totalCopies: 2,
      availableCopies: 2,
      status: 'available',
      description: 'A romantic novel of manners'
    }
  ]

  const fetchBooks = async () => {
    setLoading(true)
    setError(null)
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      setBooks(mockBooks)
    } catch (err) {
      setError('Failed to fetch books')
    } finally {
      setLoading(false)
    }
  }

  const addBook = async (bookData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const newBook = {
        id: Math.max(...books.map(b => b.id)) + 1,
        ...bookData,
        availableCopies: bookData.totalCopies,
        status: 'available'
      }
      setBooks(prev => [...prev, newBook])
      return newBook
    } catch (error) {
      throw new Error('Failed to add book')
    }
  }

  const updateBook = async (id, bookData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const updatedBook = { ...bookData, id }
      setBooks(prev => prev.map(book => 
        book.id === id ? updatedBook : book
      ))
      return updatedBook
    } catch (error) {
      throw new Error('Failed to update book')
    }
  }

  const deleteBook = async (id) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      setBooks(prev => prev.filter(book => book.id !== id))
    } catch (error) {
      throw new Error('Failed to delete book')
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const value = {
    books,
    loading,
    error,
    fetchBooks,
    addBook,
    updateBook,
    deleteBook
  }

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  )
}