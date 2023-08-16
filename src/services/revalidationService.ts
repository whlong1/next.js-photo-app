const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const revalidate = async () => {
  const res = await fetch(
    `${BASE_URL}/api/revalidate`,
    { next: { tags: ['photos'] } }
  )

  console.log("revalidate", res)
}

