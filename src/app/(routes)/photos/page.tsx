// Types
import { Photo } from "@/types/models"

// Services
import { fetchPhotos } from "@/services/photoService"

// Components
import PhotosPageHeader from "./components/PhotosPageHeader"
import MasonryPhotoGrid from "./components/MasonryPhotoGrid"
import ColumnPhotoGrid from "./components/ColumnPhotoGrid"
import BasicPhotoGrid from "./components/BasicPhotoGrid"

// Types
import { SearchParams } from "@/types/params"

const Photos = async ({ searchParams }: { searchParams: SearchParams }) => {
  const photos: Photo[] = await fetchPhotos(searchParams)
  const activeParams = Object.keys(searchParams).map((key) => {
    return { queryKey: key, queryValue: searchParams[key] }
  })

  return (
    <section className="flex flex-col w-full">
      <PhotosPageHeader activeParams={activeParams} />
      <BasicPhotoGrid photos={photos} />
    </section>
  )
}

export default Photos