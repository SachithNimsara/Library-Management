import { useState, useEffect } from 'react'
import { bookService } from '../services/bookService'

export const useFetchBooks = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        const booksData = await bookService.getAllBooks()
        setBooks(booksData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  const refetch = async () => {
    try {
      setLoading(true)
      const booksData = await bookService.getAllBooks()
      setBooks(booksData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { books, loading, error, refetch }
}