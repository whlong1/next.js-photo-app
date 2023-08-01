import 'server-only'
import { headers } from "next/headers"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const index = async () => {
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

export const create = async (formData: {}) => {
  try {
    const res = await fetch(`${BASE_URL}/api/videos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      cache: 'no-store',
    })
    return res.json()
  } catch (error) {
    throw error
  }
}