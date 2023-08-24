// Types
import { Photo } from "@/types/models"

// Services
import { fetchPhotos } from "@/services/photoService"

// Components
import FilterChip from "./components/FilterChip"
import MasonryPhotoGrid from "./components/MasonryPhotoGrid"
import AlternatePhotoGrid from "./components/AlternatePhotoGrid"

// Types
import { SearchParams } from "@/types/params"
const Photos = async ({ searchParams }: { searchParams: SearchParams }) => {
  const photos: Photo[] = await fetchPhotos(searchParams)

  console.log("Search Params", searchParams)

  const activeParamsArray = Object.keys(searchParams).map((key) => {
    return { queryKey: key, queryValue: searchParams[key] }
  })

  return (
    <section className="flex flex-col w-full">
      <header className="header">
        {activeParamsArray.map((param) => (
          <FilterChip param={param} />
        ))}
      </header>
      <MasonryPhotoGrid photos={photos} />
    </section>
  )
}

export default Photos