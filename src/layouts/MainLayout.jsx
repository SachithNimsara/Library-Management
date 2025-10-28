import React, { useState, useEffect } from 'react'
import { 
  Box, 
  useTheme, 
  useMediaQuery,
  Backdrop,
  CircularProgress
} from '@mui/material'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const MainLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'))

  const handleDrawerToggle = () => {
    if (mobileOpen) {
      setIsClosing(true)
      setTimeout(() => {
        setMobileOpen(false)
        setIsClosing(false)
      }, 300)
    } else {
      setMobileOpen(true)
    }
  }

  const handleDrawerClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setMobileOpen(false)
      setIsClosing(false)
    }, 300)
  }

  // Close mobile drawer when window is resized to desktop
  useEffect(() => {
    if (!isMobile && mobileOpen) {
      handleDrawerClose()
    }
  }, [isMobile, mobileOpen])

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      backgroundColor: 'background.default',
    }}>
      {/* Navbar */}
      <Navbar onMenuClick={handleDrawerToggle} />
      
      {/* Sidebar */}
      <Sidebar 
        open={mobileOpen} 
        onClose={handleDrawerClose}
        isClosing={isClosing}
      />
      
      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: {
            xs: 2,
            sm: 2.5,
            md: 3,
            lg: 4
          },
          width: { 
            xs: '100%', 
            md: `calc(100% - 280px)` 
          },
          marginLeft: { 
            xs: 0, 
            md: '280px' 
          },
          marginTop: {
            xs: '56px',
            sm: '64px'
          },
          minHeight: {
            xs: 'calc(100vh - 56px)',
            sm: 'calc(100vh - 64px)'
          },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(mobileOpen && {
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        {/* Content Container with Max Width */}
        <Box
          sx={{
            maxWidth: {
              xs: '100%',
              sm: '100%',
              md: '100%',
              lg: 1400,
              xl: 1600
            },
            mx: 'auto',
            width: '100%'
          }}
        >
          {children}
        </Box>
      </Box>

      {/* Mobile Backdrop */}
      {isMobile && mobileOpen && (
        <Backdrop
          open={mobileOpen}
          onClick={handleDrawerClose}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer - 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
          }}
        />
      )}
    </Box>
  )
}

export default MainLayout