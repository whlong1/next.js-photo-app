// Components
import GridToggle from "@/components/PhotoGrids/GridToggle"
import BasicPhotoGrid from "@/components/PhotoGrids/BasicPhotoGrid"
import MasonryPhotoGrid from "@/components/PhotoGrids/MasonryPhotoGrid"

// Actions
import { getMyFavorites } from "@/actions/actions"

// Types
import { Photo } from "@/types/models"
import { SearchParams } from "@/types/params"

const Favorites = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { masonry } = searchParams
  const favorites: Photo[] = await getMyFavorites()

  return (
    <>
      <header className="header">
        <h1>Favorites</h1>
        <GridToggle />
      </header>
      {masonry
        ? <MasonryPhotoGrid photos={favorites} />
        : <BasicPhotoGrid photos={favorites} />
      }
    </>
  )
}

export default Favorites