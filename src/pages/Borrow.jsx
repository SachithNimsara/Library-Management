import React, { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  Divider,
  Fade,
  Zoom,
} from '@mui/material'
import {
  Person as MemberIcon,
  Book as BookIcon,
  CalendarToday as DateIcon,
  Search as SearchIcon,
  Warning as WarningIcon,
  CheckCircle as SuccessIcon,
  Schedule as ClockIcon,
} from '@mui/icons-material'
import { useBooks } from '../context/BookContext'

const steps = ['Select Book', 'Member Details', 'Confirmation']

const Borrow = () => {
  const { books, updateBook } = useBooks()
  const [activeStep, setActiveStep] = useState(0)
  const [selectedBook, setSelectedBook] = useState('')
  const [memberId, setMemberId] = useState('')
  const [memberName, setMemberName] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const availableBooks = books.filter(book => 
    book.status === 'available' && 
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const borrowedBooks = books.filter(book => book.status === 'borrowed')

  const handleNext = () => {
    if (activeStep === 0 && !selectedBook) {
      setError('Please select a book to borrow')
      return
    }
    if (activeStep === 1 && (!memberId || !memberName || !dueDate)) {
      setError('Please fill all member details')
      return
    }
    setError('')
    setActiveStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setError('')
    setActiveStep((prev) => prev - 1)
  }

  const handleBorrow = async () => {
    setLoading(true)
    setError('')

    try {
      const bookToUpdate = books.find(book => book.id === parseInt(selectedBook))
      await updateBook(bookToUpdate.id, {
        ...bookToUpdate,
        status: 'borrowed',
        availableCopies: bookToUpdate.availableCopies - 1,
        borrowedBy: memberId,
        borrowerName: memberName,
        dueDate: dueDate,
        borrowedDate: new Date().toISOString().split('T')[0]
      })
      
      setSuccess(`Book "${bookToUpdate.title}" successfully borrowed by ${memberName}`)
      setSelectedBook('')
      setMemberId('')
      setMemberName('')
      setDueDate('')
      setActiveStep(0)
    } catch (error) {
      setError('Error borrowing book. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Zoom in={true}>
            <Box>
              <TextField
                fullWidth
                placeholder="Search available books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              
              <Grid container spacing={2}>
                {availableBooks.map((book) => (
                  <Grid item xs={12} md={6} key={book.id}>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        border: selectedBook === book.id.toString() ? 2 : 1,
                        borderColor: selectedBook === book.id.toString() ? 'primary.main' : 'divider',
                        bgcolor: selectedBook === book.id.toString() ? 'primary.50' : 'background.paper',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: 'primary.main',
                          bgcolor: 'primary.50',
                        }
                      }}
                      onClick={() => setSelectedBook(book.id.toString())}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <BookIcon />
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" fontWeight="600">
                            {book.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            by {book.author}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            <Chip label={`ISBN: ${book.isbn}`} size="small" variant="outlined" />
                            <Chip label={`${book.availableCopies} available`} color="success" size="small" />
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              {availableBooks.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" color="text.secondary">
                    No available books found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Try a different search term or check back later
                  </Typography>
                </Box>
              )}
            </Box>
          </Zoom>
        )
      case 1:
        return (
          <Zoom in={true}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Member ID"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MemberIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  helperText="Unique member identification number"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Member Name"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MemberIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Due Date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DateIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    min: new Date().toISOString().split('T')[0]
                  }}
                  helperText="Expected return date"
                />
              </Grid>
            </Grid>
          </Zoom>
        )
      case 2:
        const selectedBookData = books.find(book => book.id === parseInt(selectedBook))
        return (
          <Zoom in={true}>
            <Box>
              <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom color="primary">
                  Borrowing Summary
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Book: <strong>{selectedBookData?.title}</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Author: <strong>{selectedBookData?.author}</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Member: <strong>{memberName}</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Member ID: <strong>{memberId}</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Due Date: <strong>{dueDate}</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Borrowed Date: <strong>{new Date().toLocaleDateString()}</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
              <Alert severity="info" sx={{ mb: 2 }}>
                Please review the information above before confirming the borrowing process.
              </Alert>
            </Box>
          </Zoom>
        )
      default:
        return 'Unknown step'
    }
  }

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date()
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        Book Borrowing System
      </Typography>

      {success && (
        <Alert 
          severity="success" 
          sx={{ mb: 3 }}
          icon={<SuccessIcon />}
          onClose={() => setSuccess('')}
        >
          {success}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent>
              <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              {getStepContent(activeStep)}
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                >
                  Back
                </Button>
                
                <Button
                  variant="contained"
                  onClick={activeStep === steps.length - 1 ? handleBorrow : handleNext}
                  disabled={loading}
                  startIcon={activeStep === steps.length - 1 ? <SuccessIcon /> : null}
                >
                  {loading ? 'Processing...' : 
                   activeStep === steps.length - 1 ? 'Confirm Borrow' : 'Next'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Currently Borrowed Books
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {borrowedBooks.length} book(s) currently borrowed
              </Typography>

              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Book</TableCell>
                      <TableCell>Due Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {borrowedBooks.slice(0, 5).map((book) => (
                      <TableRow key={book.id}>
                        <TableCell>
                          <Typography variant="body2" noWrap sx={{ maxWidth: 120 }}>
                            {book.title}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={book.dueDate}
                            size="small"
                            color={isOverdue(book.dueDate) ? 'error' : 'warning'}
                            icon={isOverdue(book.dueDate) ? <WarningIcon /> : <ClockIcon />}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {borrowedBooks.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                  No books currently borrowed
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Borrow