// Components
import NewPhotoForm from "./components/NewPhotoForm"
import PhotoUploader from "./components/PhotoUploader"

const NewPhoto = () => {
  return (
    <main>
      <PhotoUploader />
      <NewPhotoForm />
    </main>
  )
}

export default NewPhoto