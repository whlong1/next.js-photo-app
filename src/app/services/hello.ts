import 'server-only'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const show = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/hello`, { cache: 'no-store' })
    return res.json()
  } catch (error) {
    throw error
  }
}

// Cache prop:
// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#dynamic-data-fetching