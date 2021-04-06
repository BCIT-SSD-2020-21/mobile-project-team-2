import axios from 'axios'
import { API_KEY, BASE_URL } from 'dotenv'

export default axios.create({
  	baseURL: 'https://finnhub.io/api/v1'
})

export async function getStockProfile(symbol) {
	const stockProfile = await axios.get(`${BASE_URL}/stock/profile2?symbol=${symbol}&token=${API_KEY}`)
	return stockProfile.data
}

export async function getStockQuote(symbol) {
	const stockQuote = await axios.get(`${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`)
	return stockQuote.data
}
