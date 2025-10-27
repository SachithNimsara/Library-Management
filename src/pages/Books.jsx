import React, { useState } from 'react'
import { useBooks } from '../context/BookContext'
import BookCard from '../components/BookCard'
import SearchBar from '../components/SearchBar'
import Button from '../components/Button'

const Books = () => {
  const { books, loading, error, deleteBook } = useBooks()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.isbn.includes(searchQuery)
  )

  const handleDelete = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(bookId)
      } catch (error) {
        alert('Error deleting book')
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        Error: {error}
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Books Management</h1>
        <Button onClick={() => window.location.href = '/add-book'}>
          Add New Book
        </Button>
      </div>

      <div className="mb-6">
        <SearchBar 
          onSearch={setSearchQuery}
          placeholder="Search books by title, author, or ISBN..."
        />
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No books found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={(book) => console.log('Edit book:', book)}
              onDelete={handleDelete}
              onBorrow={(book) => console.log('Borrow book:', book)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Books