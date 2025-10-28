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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <AppBar 
      position="fixed"
      elevation={2}
      sx={{ 
        backgroundColor: 'white',
        color: 'text.primary',
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          sx={{ mr: 2, display: { sm: 'none' } }}
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Avatar
            sx={{
              mr: 2,
              bgcolor: 'primary.main',
              width: 40,
              height: 40,
              display: { xs: 'none', sm: 'flex' }
            }}
          >
            📚
          </Avatar>
          <Box>
            <Typography variant="h6" component="h1" fontWeight="bold" noWrap>
              Library Management System
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap sx={{ display: { xs: 'none', sm: 'block' } }}>
              Manage your library efficiently
            </Typography>
          </Box>
        </Box>

        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              avatar={<AccountCircle />}
              label={isMobile ? user.name?.split(' ')[0] : user.name}
              variant="outlined"
              sx={{ 
                fontWeight: 600,
                display: { xs: 'none', sm: 'flex' }
              }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={isMobile ? null : <LogoutIcon />}
              onClick={logout}
              size={isMobile ? "small" : "medium"}
            >
              {isMobile ? 'Logout' : 'Logout'}
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar