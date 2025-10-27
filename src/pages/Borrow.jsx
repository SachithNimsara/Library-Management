import React, { useState } from 'react'
import { useBooks } from '../context/BookContext'
import Button from '../components/Button'

const Borrow = () => {
  const { books, updateBook } = useBooks()
  const [selectedBook, setSelectedBook] = useState('')
  const [memberId, setMemberId] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [loading, setLoading] = useState(false)

  const availableBooks = books.filter(book => book.status === 'available')

  const handleBorrow = async (e) => {
    e.preventDefault()
    if (!selectedBook || !memberId || !dueDate) {
      alert('Please fill all fields')
      return
    }

    setLoading(true)
    try {
      const bookToUpdate = books.find(book => book.id === parseInt(selectedBook))
      await updateBook(bookToUpdate.id, {
        ...bookToUpdate,
        status: 'borrowed',
        availableCopies: bookToUpdate.availableCopies - 1,
        borrowedBy: memberId,
        dueDate: dueDate
      })
      
      alert('Book borrowed successfully!')
      setSelectedBook('')
      setMemberId('')
      setDueDate('')
    } catch (error) {
      alert('Error borrowing book')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Borrow Book</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleBorrow} className="space-y-6">
          <div>
            <label htmlFor="book" className="block text-sm font-medium text-gray-700">
              Select Book *
            </label>
            <select
              id="book"
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Choose a book...</option>
              {availableBooks.map(book => (
                <option key={book.id} value={book.id}>
                  {book.title} by {book.author} (ISBN: {book.isbn})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="memberId" className="block text-sm font-medium text-gray-700">
              Member ID *
            </label>
            <input
              type="text"
              id="memberId"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              required
              placeholder="Enter member ID"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
              Due Date *
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              min={new Date().toISOString().split('T')[0]}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <Button type="submit" loading={loading} className="w-full">
            Borrow Book
          </Button>
        </form>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Currently Borrowed Books</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Borrowed By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {books
                .filter(book => book.status === 'borrowed')
                .map(book => (
                  <tr key={book.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {book.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {book.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {book.borrowedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        new Date(book.dueDate) < new Date() 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {book.dueDate}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Borrow