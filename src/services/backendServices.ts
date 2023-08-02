import 'server-only'
import { headers } from "next/headers"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const fetchGreetings = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/greetings`, { cache: 'no-store' })
    return res.json()
  } catch (error) {
    throw error
  }
}

export const fetchVideos = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/videos`, {
      cache: 'no-store',
      headers: headers(),
    })
    return res.json()
  } catch (error) {
    throw error
  }
}