"use client"
// React
import { useState } from "react"

// Components
import NewPhotoForm from "./NewPhotoForm"
import PhotoUploader from "./PhotoUploader"

const NewPhotoDialog = () => {

  /*/
    PhotUploader updates the URL params with the new photoId
    NewPhotoForm requires this URL param (queryParams.get("photoId"))
    Move up necessary state to NewPhotoDialog
    Submit form and store file in one action
    Preview image with local file
    Only downside is edit will require an adjusted workflow
  /*/

  return (
    <div className="bg-white border rounded">
      <header className="flex justify-between p-4 border-b">
        <h1>New Photo</h1>
        <button>X</button>
      </header>
      <section className="flex h-[380px] items-stretch">
        <PhotoUploader />
        <NewPhotoForm />
      </section>
    </div>
  )
}

export default NewPhotoDialog