"use client"
// React
import { useState } from "react"

// Components
import NewPhotoForm from "./NewPhotoForm"
import PhotoUploader from "./PhotoUploader"

const NewPhotoDialog = () => {

  const [photoId, setPhotoId] = useState("")

  //TODO Address state toggle (local vs shared)
  // What state needs to be here?
  // child components need to share:
  // isUploaded?
  // photoId

  // How do we handle edits?
  // Pass state in link
  // A user would see a list of their photos (marked uploaded or note)
  // clicking on a photo would bring its details up (params)
  // refreshing would still grant access to the selected photo
  // pass props down to dialog box

  // the dialog box needs to appear for a details view and a new view
  // drop the component in both pages?
  // config based on params

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