// Mock auth service - no actual API calls
export const authService = {
  login: async (email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (email && password) {
      return {
        user: {
          id: 1,
          name: 'Library Admin',
          email: email,
          role: 'admin'
        },
        token: 'mock-jwt-token'
      }
    } else {
      throw new Error('Invalid credentials')
    }
  },

  verifyToken: async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const token = localStorage.getItem('token')
    if (token) {
      return {
        id: 1,
        name: 'Library Admin',
        email: 'admin@library.com',
        role: 'admin'
      }
    }
    throw new Error('Invalid token')
  }
}