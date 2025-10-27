import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Chip,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  AccountCircle,
} from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <AppBar 
      position="sticky" 
      elevation={2}
      sx={{ 
        backgroundColor: 'white',
        color: 'text.primary',
        borderBottom: `1px solid ${theme.palette.divider}`
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            sx={{ mr: 2 }}
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Avatar
            sx={{
              mr: 2,
              bgcolor: 'primary.main',
              width: 40,
              height: 40,
            }}
          >
            📚
          </Avatar>
          <Box>
            <Typography variant="h6" component="h1" fontWeight="bold">
              Library Management System
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage your library efficiently
            </Typography>
          </Box>
        </Box>

        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              avatar={<AccountCircle />}
              label={user.name}
              variant="outlined"
              sx={{ 
                fontWeight: 600,
                display: { xs: 'none', sm: 'flex' }
              }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<LogoutIcon />}
              onClick={logout}
              size={isMobile ? "small" : "medium"}
            >
              {isMobile ? '' : 'Logout'}
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar