// React
import { useState } from "react"

// Components
import NewPhotoForm from "./NewPhotoForm"
import PhotoUploader from "./PhotoUploader"

const NewPhotoDialog = () => {
  //TODO Address state toggle (local vs shared)

  return (
    <dialog open className="rounded">
      <header>
        <h1>ADD PHOTO</h1>
      </header>
      <section className="flex flex-row">
        <PhotoUploader />
        <NewPhotoForm />
      </section>
    </dialog>
  )
}

export default NewPhotoDialog