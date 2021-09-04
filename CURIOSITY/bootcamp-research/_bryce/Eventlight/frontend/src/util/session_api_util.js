import axios from 'axios'

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export const register = userData => {
  return axios.post('/api/users/register', userData)
}

export const login = userData => {
  return axios.post('/api/users/login', userData)
}

export const checkForExistingEmail = email => {
  return axios.get('/api/users/check_email', {
    params: {
      email
    }
  })
}

export const getCurrentUser = () => axios.get('/api/users/current')
