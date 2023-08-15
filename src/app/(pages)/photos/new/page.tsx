// Components
import NewPhotoDialog from "./components/NewPhotoDialog"


// This page might not be necessary:
const NewPhoto = ({ searchParams }: { searchParams: { photoId: string } }) => {
  console.log("Search Params", searchParams)

  return (
    <main>

      <NewPhotoDialog />

    </main>
  )
}

export default NewPhoto