import axios from 'axios'

const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  async login(credentials) {
    try {
      const response = await apiClient.post('/login', credentials)
      
      // Simpan token dan data user
      this.setToken(response.data.access_token)
      this.setUser(response.data.user)
      
      return response
    } catch (error) {
      throw error
    }
  },

  logout() {
    return new Promise((resolve) => {
      // Hapus token dan data user
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
      
      // Hapus header auth
      delete apiClient.defaults.headers.common['Authorization']
      
      resolve()
    })
  },

  setToken(token) {
    localStorage.setItem('auth_token', token)
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
  },

  getToken() {
    return localStorage.getItem('auth_token')
  },

  setUser(user) {
    localStorage.setItem('user_data', JSON.stringify(user))
  },

  getUser() {
    const user = localStorage.getItem('user_data')
    return user ? JSON.parse(user) : null
  },

  isAuthenticated() {
    return !!this.getToken()
  },

  initialize() {
    const token = this.getToken()
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }
}
