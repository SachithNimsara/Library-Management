// Mock book service - uses local data
let mockBooks = [
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
  }
]

export const bookService = {
  getAllBooks: async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockBooks
  },

  addBook: async (bookData) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const newBook = {
      id: Math.max(...mockBooks.map(b => b.id)) + 1,
      ...bookData,
      availableCopies: bookData.totalCopies,
      status: 'available'
    }
    mockBooks.push(newBook)
    return newBook
  },

  updateBook: async (id, bookData) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const index = mockBooks.findIndex(book => book.id === id)
    if (index !== -1) {
      mockBooks[index] = { ...bookData, id }
      return mockBooks[index]
    }
    throw new Error('Book not found')
  },

  deleteBook: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    mockBooks = mockBooks.filter(book => book.id !== id)
    return { message: 'Book deleted successfully' }
  }
}