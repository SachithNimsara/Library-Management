import React, { useState } from 'react'
import { Box } from '@mui/material'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const MainLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar onMenuClick={handleDrawerToggle} />
      <Sidebar open={mobileOpen} onClose={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - 280px)` },
          ml: { md: '280px' },
          mt: '64px',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default MainLayout