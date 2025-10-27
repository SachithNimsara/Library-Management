import React from 'react'
import Button from './Button'

const BookCard = ({ book, onEdit, onDelete, onBorrow }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'status-available'
      case 'borrowed':
        return 'status-borrowed'
      case 'maintenance':
        return 'status-maintenance'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return '✅'
      case 'borrowed':
        return '📖'
      case 'maintenance':
        return '🔧'
      default:
        return '📚'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover-lift group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
            {book.title}
          </h3>
          <p className="text-gray-600 mt-1">by {book.author}</p>
        </div>
        <div className="flex items-center gap-2 ml-3">
          <span className="text-lg">{getStatusIcon(book.status)}</span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(book.status)}`}>
            {book.status}
          </span>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <span className="font-medium mr-2">ISBN:</span>
          <code className="bg-gray-100 px-2 py-1 rounded text-xs">{book.isbn}</code>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span className="font-medium mr-2">Year:</span>
          <span>{book.publishedYear}</span>
        </div>
      </div>

      {book.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{book.description}</p>
      )}

      <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
        <span className="text-sm text-gray-600 font-medium">Copies</span>
        <div className="flex items-center gap-2">
          <span className={`text-lg font-bold ${
            book.availableCopies > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {book.availableCopies}
          </span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700 font-medium">{book.totalCopies}</span>
          <span className="text-sm text-gray-500">available</span>
        </div>
      </div>

      <div className="flex gap-2">
        {book.status === 'available' && book.availableCopies > 0 && (
          <Button 
            size="small" 
            onClick={() => onBorrow(book)}
            className="flex-1"
            icon="📥"
          >
            Borrow
          </Button>
        )}
        <Button 
          variant="outline" 
          size="small" 
          onClick={() => onEdit(book)}
          icon="✏️"
        >
          Edit
        </Button>
        <Button 
          variant="danger" 
          size="small" 
          onClick={() => onDelete(book.id)}
          icon="🗑️"
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

export default BookCard