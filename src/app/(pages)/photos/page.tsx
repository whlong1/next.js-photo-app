import { prisma } from "@/lib/db"
import { Photo } from "@/types/models"
import { fetchPhotos } from "@/services/photoService"

const Photos = async ({ searchParams }: { searchParams: any }) => {
  console.log("Search Params", searchParams)
  const photos: Photo[] = await prisma.photo.findMany({})

  const fetchInServer = async () => {
    const start = performance.now()
    const photos: Photo[] = await fetchPhotos()
    const end = performance.now()
    console.log("fetchInServer Duration", end - start)
  }

  const dbOperation = async () => {
    const start = performance.now()
    const photos: Photo[] = await prisma.photo.findMany({})
    const end = performance.now()
    console.log("dbOperation Duration", end - start)
  }

  await Promise.all([fetchInServer(), dbOperation()])

  return (
    <main>
      <h1>Photos Hub</h1>
    </main>
  )
}

export default Photos