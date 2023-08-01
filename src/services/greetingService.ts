import 'server-only'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const show = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/greetings`, { cache: 'no-store' })
    return res.json()
  } catch (error) {
    throw error
  }
}