import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization: 'Basic ' + import.meta.env.VITE_API_KEY
  }
})
