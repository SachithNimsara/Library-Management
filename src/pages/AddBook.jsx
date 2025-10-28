import React, { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Alert,
  Paper,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Divider,
  Chip,
  Fade,
  Zoom,
} from '@mui/material'
import {
  Save as SaveIcon,
  ArrowBack as BackIcon,
  Book as BookIcon,
  Person as AuthorIcon,
  Numbers as IsbnIcon,
  CalendarToday as YearIcon,
  LibraryBooks as CopiesIcon, // Changed from Copy
  Description as DescIcon,
  Category as GenreIcon, // Added for genre
  Business as PublisherIcon, // Added for publisher
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useBooks } from '../context/BookContext'

const steps = ['Basic Information', 'Book Details', 'Review & Submit']

const AddBook = () => {
  const navigate = useNavigate()
  const { addBook } = useBooks()
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    publishedYear: new Date().getFullYear(),
    totalCopies: 1,
    description: '',
    genre: '',
    publisher: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleNext = () => {
    setActiveStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setActiveStep((prev) => prev - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await addBook(formData)
      navigate('/books')
    } catch (err) {
      setError('Failed to add book. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Zoom in={true} timeout={500}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Book Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BookIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  helperText="Enter the complete title of the book"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AuthorIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  helperText="Full name of the author"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BookIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  helperText="e.g., Fiction, Science, Technology, etc."
                />
              </Grid>
            </Grid>
          </Zoom>
        )
      case 1:
        return (
          <Zoom in={true} timeout={500}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="ISBN"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IsbnIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  helperText="13-digit International Standard Book Number"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Published Year"
                  name="publishedYear"
                  type="number"
                  value={formData.publishedYear}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <YearIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ min: 1000, max: new Date().getFullYear() }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Total Copies"
                  name="totalCopies"
                  type="number"
                  value={formData.totalCopies}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CopiesIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ min: 1 }}
                  helperText="Number of copies available in library"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Publisher"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BookIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Zoom>
        )
      case 2:
        return (
          <Zoom in={true} timeout={500}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    multiline
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DescIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    helperText="Brief description about the book"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Paper variant="outlined" sx={{ p: 3, bgcolor: 'grey.50' }}>
                    <Typography variant="h6" gutterBottom color="primary">
                      Book Summary
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Title: <strong>{formData.title}</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Author: <strong>{formData.author}</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          ISBN: <strong>{formData.isbn}</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Year: <strong>{formData.publishedYear}</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Copies: <strong>{formData.totalCopies}</strong>
                        </Typography>
                      </Grid>
                      {formData.genre && (
                        <Grid item xs={12} sm={6}>
                          <Chip label={formData.genre} color="primary" size="small" />
                        </Grid>
                      )}
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Zoom>
        )
      default:
        return 'Unknown step'
    }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Button
          startIcon={<BackIcon />}
          onClick={() => navigate('/books')}
          variant="outlined"
        >
          Back to Books
        </Button>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Add New Book
        </Typography>
      </Box>

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

          <form onSubmit={handleSubmit}>
            {getStepContent(activeStep)}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
              >
                Back
              </Button>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<SaveIcon />}
                    disabled={loading}
                  >
                    {loading ? 'Adding Book...' : 'Add Book to Library'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

export default AddBook