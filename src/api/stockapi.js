import axios from 'axios'
import { API_KEY, BASE_URL } from 'dotenv'
import { get } from 'react-native/Libraries/Utilities/PixelRatio'

// returns an axios instance
export default axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  // headers: {
  //   "X-Finnhub-Token": API_KEY
  // }
})

export async function getStockProfile(symbol) {
  // console.log("param1: ", symbol)
  const stockProfile = await axios.get(`${BASE_URL}/stock/profile2?symbol=${symbol}&token=${API_KEY}`)
  // console.log("stockProfile request: ", `${BASE_URL}/stock/profile2?symbol=${symbol}&token=${API_KEY}`)
  return stockProfile.data
}
export async function getStockQuote(symbol) {
  // console.log("getStockQuote request: ", `${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`)
  const stockQuote = await axios.get(`${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`)
    // console.log("stockQuote: ", stockQuote)
  return stockQuote.data
}
