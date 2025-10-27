import React from 'react'
import { Button as MuiButton } from '@mui/material'

const Button = ({ 
  children, 
  variant = 'contained', 
  color = 'primary',
  size = 'medium',
  loading = false,
  startIcon,
  endIcon,
  ...props 
}) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      disabled={loading}
      startIcon={loading ? null : startIcon}
      endIcon={loading ? null : endIcon}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </MuiButton>
  )
}

export default Button