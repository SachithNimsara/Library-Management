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
  Button,
} from '@mui/material'
import {
  Book as BookIcon,
  CheckCircle as AvailableIcon,
  Schedule as BorrowedIcon,
  TrendingUp as TrendingIcon,
  Add as AddIcon,
  People as PeopleIcon,
  Bookmark as BookmarkIcon,
} from '@mui/icons-material'
import { useBooks } from '../context/BookContext'
import { useNavigate } from 'react-router-dom'

const StatCard = ({ title, value, icon, color = 'primary', subtitle, onClick }) => (
  <Card 
    sx={{ 
      height: '100%', 
      transition: '0.3s', 
      cursor: onClick ? 'pointer' : 'default',
      '&:hover': { 
        transform: onClick ? 'translateY(-4px)' : 'none',
        boxShadow: onClick ? 6 : 2,
      } 
    }}
    onClick={onClick}
  >
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography color="text.secondary" gutterBottom variant="overline">
            {title}
          </Typography>
          <Typography variant="h4" component="div" fontWeight="bold" color={`${color}.main`}>
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

const QuickActionCard = ({ title, description, icon, color = 'primary', onClick }) => (
  <Paper
    variant="outlined"
    sx={{
      p: 3,
      cursor: 'pointer',
      transition: '0.2s',
      border: '2px solid',
      borderColor: 'transparent',
      '&:hover': { 
        bgcolor: `${color}.50`, 
        borderColor: `${color}.main`,
        transform: 'translateY(-2px)',
      },
    }}
    onClick={onClick}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box
        sx={{
          p: 1.5,
          borderRadius: 2,
          bgcolor: `${color}.100`,
          color: `${color}.main`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="h6" fontWeight="600" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </Box>
  </Paper>
)

const Home = () => {
  const { books, loading } = useBooks()
  const navigate = useNavigate()

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

  const quickActions = [
    {
      title: 'Add New Book',
      description: 'Add a new book to your library collection',
      icon: <AddIcon />,
      color: 'primary',
      onClick: () => navigate('/add-book'),
    },
    {
      title: 'Manage Members',
      description: 'View and manage library members',
      icon: <PeopleIcon />,
      color: 'secondary',
      onClick: () => navigate('/members'),
    },
    {
      title: 'Borrow Book',
      description: 'Issue books to library members',
      icon: <BookmarkIcon />,
      color: 'success',
      onClick: () => navigate('/borrow'),
    },
  ]

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
            onClick={() => navigate('/books')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Available Books"
            value={stats.availableBooks}
            icon={<AvailableIcon fontSize="large" />}
            color="success"
            subtitle="Ready to borrow"
            onClick={() => navigate('/books')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Borrowed Books"
            value={stats.borrowedBooks}
            icon={<BorrowedIcon fontSize="large" />}
            color="warning"
            subtitle="Currently issued"
            onClick={() => navigate('/borrow')}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Quick Actions
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {quickActions.map((action, index) => (
                  <QuickActionCard
                    key={index}
                    title={action.title}
                    description={action.description}
                    icon={action.icon}
                    color={action.color}
                    onClick={action.onClick}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Books */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  Recent Books
                </Typography>
                <Button 
                  size="small" 
                  onClick={() => navigate('/books')}
                  endIcon={<TrendingIcon />}
                >
                  View All
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {recentBooks.length > 0 ? (
                  recentBooks.map((book) => (
                    <Paper key={book.id} variant="outlined" sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                          <Typography variant="body1" fontWeight="600" gutterBottom>
                            {book.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            by {book.author}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ISBN: {book.isbn}
                          </Typography>
                        </Box>
                        <Chip
                          label={book.status}
                          color={book.status === 'available' ? 'success' : 'warning'}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </Paper>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                    No books available. Add some books to get started!
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activities */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Recent Activities
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Paper variant="outlined" sx={{ p: 3, bgcolor: 'primary.50' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TrendingIcon color="primary" />
                    <Box>
                      <Typography variant="body1" fontWeight="600">
                        Welcome to Library Management System! 🎉
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Get started by exploring the different sections:
                      </Typography>
                      <Box component="ul" sx={{ mt: 1, pl: 2 }}>
                        <Typography component="li" variant="body2" color="text.secondary">
                          <strong>Books:</strong> Manage your book collection
                        </Typography>
                        <Typography component="li" variant="body2" color="text.secondary">
                          <strong>Members:</strong> Add and manage library members
                        </Typography>
                        <Typography component="li" variant="body2" color="text.secondary">
                          <strong>Borrow:</strong> Issue and track borrowed books
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
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