import 'server-only'

// Context on the cache prop below:
// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#dynamic-data-fetching
const show = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/hello", { cache: 'no-store' })
    return res.json()
  } catch (error) {
    throw error
  }
}

export { show }