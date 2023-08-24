// Types
import { Photo } from "@/types/models"

// Services
import { fetchPhotos } from "@/services/photoService"

// Components
import MasonryPhotoGrid from "./components/MasonryPhotoGrid"
import AlternatePhotoGrid from "./components/AlternatePhotoGrid"

// Types
import { SearchParams } from "@/types/params"
const Photos = async ({ searchParams }: { searchParams: SearchParams }) => {
  const photos: Photo[] = await fetchPhotos(searchParams)

  console.log("Search Params", searchParams)

  const activeParamsArray = Object.entries(searchParams).map((pair) => {
    return { queryKey: pair[0], queryValue: pair[1] }
  })
  console.log("PARAMS ARRAY", activeParamsArray)

  return (
    <section className="flex flex-col w-full">
      <header>
        {activeParamsArray.map((param) => (
          <div className="chip">
            <p>{param.queryValue}</p>
            <button>X</button>
          </div>
        ))}
      </header>
      <MasonryPhotoGrid photos={photos} />
    </section>
  )
}

export default Photos


  // Might want to move the browse header up one level
  // that could include the search bar?
  // Other option, remove it, search goes into site nav?
  // But this would imply a site wide search, whereas
  // including it in a photos layout implies a search on photos alone.
  // Showing results text and pagination would make the most sense here.