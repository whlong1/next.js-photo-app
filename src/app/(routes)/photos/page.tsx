// Types
import { Photo } from "@/types/models"

// Services
import { fetchPhotos } from "@/services/photoService"

// Components
import PhotosPageHeader from "./components/PhotosPageHeader"
import MasonryPhotoGrid from "./components/MasonryPhotoGrid"
import BasicPhotoGrid from "./components/BasicPhotoGrid"

// Types
import { SearchParams } from "@/types/params"

const Photos = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { masonry } = searchParams
  const photos: Photo[] = await fetchPhotos(searchParams)
  const activeParams = Object.keys(searchParams).filter((key) => key !== "masonry").map((key) => {
    return { queryKey: key, queryValue: searchParams[key] }
  })

  return (
    <section className="flex flex-col w-full">
      <PhotosPageHeader activeParams={activeParams} />
      {masonry
        ? <MasonryPhotoGrid photos={photos} />
        : <BasicPhotoGrid photos={photos} />
      }
    </section>
  )
}

export default Photos