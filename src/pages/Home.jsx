import React from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Paper,
} from '@mui/material'
import {
  Book as BookIcon,
  CheckCircle as AvailableIcon,
  Schedule as BorrowedIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material'
import { useBooks } from '../context/BookContext'

const StatCard = ({ title, value, icon, color, subtitle }) => (
  <Card sx={{ height: '100%', transition: '0.3s', '&:hover': { transform: 'translateY(-4px)' } }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography color="text.secondary" gutterBottom variant="overline">
            {title}
          </Typography>
          <Typography variant="h4" component="div" fontWeight="bold" color={color}>
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: `${color}.50`,
            color: `${color}.500`,
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
)

const Home = () => {
  const { books, loading } = useBooks()

  if (loading) {
    return (
      <Box sx={{ width: '100%', mt: 4 }}>
        <LinearProgress />
      </Box>
    )
  }

  const stats = {
    totalBooks: books.length,
    availableBooks: books.filter(book => book.status === 'available').length,
    borrowedBooks: books.filter(book => book.status === 'borrowed').length,
  }

  const recentBooks = books.slice(0, 3)

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
        Dashboard Overview
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Books"
            value={stats.totalBooks}
            icon={<BookIcon fontSize="large" />}
            color="primary"
            subtitle="In library collection"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Available Books"
            value={stats.availableBooks}
            icon={<AvailableIcon fontSize="large" />}
            color="success"
            subtitle="Ready to borrow"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Borrowed Books"
            value={stats.borrowedBooks}
            icon={<BorrowedIcon fontSize="large" />}
            color="warning"
            subtitle="Currently issued"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Activities */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Recent Activities
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TrendingIcon color="primary" />
                    <Box>
                      <Typography variant="body1" fontWeight="medium">
                        Welcome to Library Management System
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Get started by adding books and managing members
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
                
                {recentBooks.map((book) => (
                  <Paper key={book.id} variant="outlined" sx={{ p: 2, mb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          {book.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          by {book.author}
                        </Typography>
                      </Box>
                      <Chip
                        label={book.status}
                        color={book.status === 'available' ? 'success' : 'warning'}
                        size="small"
                      />
                    </Box>
                  </Paper>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Quick Actions
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    transition: '0.2s',
                    '&:hover': { bgcolor: 'primary.50', borderColor: 'primary.main' },
                  }}
                  onClick={() => window.location.href = '/add-book'}
                >
                  <Typography variant="body1" fontWeight="medium">
                    📚 Add New Book
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Add a new book to collection
                  </Typography>
                </Paper>
                
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    transition: '0.2s',
                    '&:hover': { bgcolor: 'secondary.50', borderColor: 'secondary.main' },
                  }}
                  onClick={() => window.location.href = '/members'}
                >
                  <Typography variant="body1" fontWeight="medium">
                    👥 Manage Members
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    View and manage library members
                  </Typography>
                </Paper>
                
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    transition: '0.2s',
                    '&:hover': { bgcolor: 'success.50', borderColor: 'success.main' },
                  }}
                  onClick={() => window.location.href = '/borrow'}
                >
                  <Typography variant="body1" fontWeight="medium">
                    🔖 Issue Book
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Issue book to member
                  </Typography>
                </Paper>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home