// Components
import { Suspense } from "react"
import FileList from "../components/FileList/FileList"
import PhotoListSkeleton from "../components/FileListSkeleton/FileListSkeleton"

// Actions
import { getMyFavorites } from "@/actions/actions"

const Favorites = async () => {
  const favorites = await getMyFavorites()

  console.log(favorites)
  return (
    <>
      <header className="header">
        <h1>Favorites</h1>
      </header>
      <section className="h-full">
        <Suspense fallback={<PhotoListSkeleton />}>
          <FileList />
        </Suspense>
      </section>
    </>
  )
}

export default Favorites