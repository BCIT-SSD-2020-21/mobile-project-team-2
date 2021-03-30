import axios from 'axios'
import { API_KEY } from 'dotenv'

// returns an axios instance
export default axios.create({
  baseURL: 'https://finnhub.io/api/v1/',
  headers: {
    "X-Finnhub-Token": API_KEY
  }
})