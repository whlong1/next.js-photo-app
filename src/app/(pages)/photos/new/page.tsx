// Components
import NewPhotoForm from "./components/NewPhotoForm"
import PhotoUploader from "./components/PhotoUploader"

const NewPhoto = () => {
  return (
    <main>

      <dialog open className="rounded">
        <header>
          <h1>ADD PHOTO</h1>
        </header>
        <section className="flex flex-row">
          <PhotoUploader />
          <NewPhotoForm />
        </section>
      </dialog>

    </main>
  )
}

export default NewPhoto