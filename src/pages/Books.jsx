import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Pagination,
  Stack,
  Avatar,
  Tooltip,
  Fade,
  Zoom,
} from '@mui/material'
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Bookmark as BookmarkIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useBooks } from '../context/BookContext'

const Books = () => {
  const navigate = useNavigate()
  const { books, deleteBook } = useBooks()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('title')
  const [page, setPage] = useState(1)
  const [deleteDialog, setDeleteDialog] = useState(null)
  const itemsPerPage = 6

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.includes(searchTerm)
    const matchesFilter = filterStatus === 'all' || book.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title)
      case 'author':
        return a.author.localeCompare(b.author)
      case 'year':
        return b.publishedYear - a.publishedYear
      case 'copies':
        return b.availableCopies - a.availableCopies
      default:
        return 0
    }
  })

  const paginatedBooks = sortedBooks.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  const handleDelete = async (bookId) => {
    try {
      await deleteBook(bookId)
      setDeleteDialog(null)
    } catch (error) {
      console.error('Error deleting book:', error)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'success'
      case 'borrowed': return 'warning'
      case 'maintenance': return 'error'
      default: return 'default'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return '✅'
      case 'borrowed': return '📖'
      case 'maintenance': return '🔧'
      default: return '📚'
    }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Books Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/add-book')}
          size="large"
        >
          Add New Book
        </Button>
      </Box>

      {/* Search and Filter Section */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search books by title, author, or ISBN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Filter by Status</InputLabel>
                <Select
                  value={filterStatus}
                  label="Filter by Status"
                  onChange={(e) => setFilterStatus(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <FilterIcon />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="available">Available</MenuItem>
                  <MenuItem value="borrowed">Borrowed</MenuItem>
                  <MenuItem value="maintenance">Maintenance</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <SortIcon />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="title">Title</MenuItem>
                  <MenuItem value="author">Author</MenuItem>
                  <MenuItem value="year">Publication Year</MenuItem>
                  <MenuItem value="copies">Available Copies</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="body2" color="text.secondary" align="center">
                {filteredBooks.length} books found
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Books Grid */}
      <Grid container spacing={3}>
        {paginatedBooks.map((book, index) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Zoom in={true} timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
              <Card 
                elevation={3}
                sx={{ 
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        width: 50,
                        height: 50,
                        mr: 2,
                        fontSize: '1.2rem'
                      }}
                    >
                      {getStatusIcon(book.status)}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" fontWeight="600" gutterBottom noWrap>
                        {book.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        by {book.author}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Chip 
                      label={book.status.toUpperCase()} 
                      color={getStatusColor(book.status)}
                      size="small"
                      variant="filled"
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                      ISBN: {book.isbn}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Published: {book.publishedYear}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <BookmarkIcon color="action" sx={{ fontSize: 16, mr: 0.5 }} />
                      <Typography variant="body2" fontWeight="600">
                        {book.availableCopies}/{book.totalCopies}
                      </Typography>
                    </Box>
                  </Box>

                  {book.description && (
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {book.description}
                    </Typography>
                  )}

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                    <Tooltip title="View Details">
                      <IconButton color="primary" size="small">
                        <ViewIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Book">
                      <IconButton color="secondary" size="small">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    {book.status === 'available' && (
                      <Tooltip title="Borrow Book">
                        <IconButton color="success" size="small">
                          <BookmarkIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Delete Book">
                      <IconButton 
                        color="error" 
                        size="small"
                        onClick={() => setDeleteDialog(book)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {filteredBooks.length > itemsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={Math.ceil(filteredBooks.length / itemsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
            size="large"
          />
        </Box>
      )}

      {/* No Results */}
      {filteredBooks.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No books found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filter criteria
          </Typography>
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteDialog}
        onClose={() => setDeleteDialog(null)}
        TransitionComponent={Fade}
      >
        <DialogTitle>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{deleteDialog?.title}" by {deleteDialog?.author}?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(null)}>Cancel</Button>
          <Button 
            onClick={() => handleDelete(deleteDialog?.id)} 
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Books