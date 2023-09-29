// Components
import BasicPhotoGrid from "../../../../components/PhotoGrids/BasicPhotoGrid"

// Actions
import { getMyFavorites } from "@/actions/actions"

// Types
import { Photo } from "@/types/models"

const Favorites = async () => {
  const favorites: Photo[] = await getMyFavorites()

  return (
    <>
      <header className="header">
        <h1>Favorites</h1>
      </header>
      <BasicPhotoGrid photos={favorites} />
    </>
  )
}

export default Favorites