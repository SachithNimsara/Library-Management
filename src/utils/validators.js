export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateISBN = (isbn) => {
  // Basic ISBN validation (10 or 13 digits)
  const isbnRegex = /^(?:\d{10}|\d{13})$/
  return isbnRegex.test(isbn.replace(/[-\s]/g, ''))
}

export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s-()]{10,}$/
  return phoneRegex.test(phone)
}

export const validateBookData = (bookData) => {
  const errors = {}

  if (!bookData.title?.trim()) {
    errors.title = 'Title is required'
  }

  if (!bookData.author?.trim()) {
    errors.author = 'Author is required'
  }

  if (!validateISBN(bookData.isbn)) {
    errors.isbn = 'Valid ISBN is required (10 or 13 digits)'
  }

  if (!bookData.publishedYear || bookData.publishedYear < 1000 || bookData.publishedYear > new Date().getFullYear()) {
    errors.publishedYear = 'Valid publication year is required'
  }

  if (!bookData.totalCopies || bookData.totalCopies < 1) {
    errors.totalCopies = 'At least one copy is required'
  }

  return errors
}