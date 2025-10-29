import React, { useState, useEffect } from 'react'
import { 
  Box, 
  useTheme, 
  useMediaQuery,
  Backdrop,
  CircularProgress,
  Container
} from '@mui/material'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const MainLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const theme = useTheme()
  
  // Enhanced breakpoints for better responsiveness
  const isXs = useMediaQuery(theme.breakpoints.down('sm')) // 0-600px
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md')) // 600-900px
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg')) // 900-1200px
  const isLg = useMediaQuery(theme.breakpoints.between('lg', 'xl')) // 1200-1536px
  const isXl = useMediaQuery(theme.breakpoints.up('xl')) // 1536px+

  const handleDrawerToggle = () => {
    if (mobileOpen) {
      setIsClosing(true)
      setTimeout(() => {
        setMobileOpen(false)
        setIsClosing(false)
      }, 250)
    } else {
      setMobileOpen(true)
    }
  }

  const handleDrawerClose = () => {
    if (isXs || isSm) {
      setIsClosing(true)
      setTimeout(() => {
        setMobileOpen(false)
        setIsClosing(false)
      }, 250)
    }
  }

  // Close mobile drawer when window is resized to larger screens
  useEffect(() => {
    if ((isMd || isLg || isXl) && mobileOpen) {
      handleDrawerClose()
    }
  }, [isMd, isLg, isXl, mobileOpen])

  // Simulate loading state (you can remove this if not needed)
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  // Dynamic padding based on screen size
  const getContentPadding = () => {
    if (isXs) return { xs: 1.5, sm: 2 }
    if (isSm) return { xs: 2, sm: 2.5 }
    if (isMd) return { xs: 2.5, sm: 3 }
    if (isLg) return { xs: 3, sm: 3.5 }
    return { xs: 3.5, sm: 4 } // isXl
  }

  // Dynamic max width based on screen size
  const getMaxWidth = () => {
    if (isXs) return '100%'
    if (isSm) return '100%'
    if (isMd) return '100%'
    if (isLg) return 1200
    return 1400 // isXl
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      backgroundColor: 'background.default',
      overflowX: 'hidden', // Prevent horizontal scroll
    }}>
      {/* Loading Backdrop */}
      {isLoading && (
        <Backdrop
          open={isLoading}
          sx={{
            zIndex: theme.zIndex.drawer + 2,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <CircularProgress size={60} thickness={4} />
          <Box sx={{ textAlign: 'center' }}>
            <Box
              component="img"
              src="/src/assets/logo.png"
              alt="Library Logo"
              sx={{
                width: 60,
                height: 60,
                mb: 2,
                borderRadius: 2,
                boxShadow: 2
              }}
            />
          </Box>
        </Backdrop>
      )}

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
          width: { 
            xs: '100%', 
            md: `calc(100% - 280px)` 
          },
          marginLeft: { 
            xs: 0, 
            md: '280px' 
          },
          marginTop: {
            xs: '56px',  // Mobile navbar height
            sm: '64px',  // Desktop navbar height
          },
          minHeight: {
            xs: 'calc(100vh - 56px)',
            sm: 'calc(100vh - 64px)'
          },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard,
          }),
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Main Content Container */}
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            p: getContentPadding(),
            width: '100%',
            maxWidth: getMaxWidth(),
            mx: 'auto',
          }}
        >
          {/* Content Wrapper with Proper Spacing */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: {
                xs: 2,  // Mobile
                sm: 2.5, // Small tablet
                md: 3,  // Tablet
                lg: 3.5, // Laptop
                xl: 4   // Desktop
              },
              width: '100%',
              '& > *': {
                width: '100%'
              }
            }}
          >
            {children}
          </Box>

          {/* Optional Footer Space */}
          <Box sx={{ height: { xs: 20, sm: 30, md: 40 } }} />
        </Container>
      </Box>

      {/* Mobile Backdrop */}
      {(isXs || isSm) && mobileOpen && (
        <Backdrop
          open={mobileOpen && !isClosing}
          onClick={handleDrawerClose}
          sx={{
            zIndex: theme.zIndex.drawer - 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(8px)',
            transition: theme.transitions.create('opacity', {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.standard,
            }),
          }}
        />
      )}
    </Box>
  )
}

export default MainLayout