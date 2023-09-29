// Types
import { Photo } from "@/types/models"

// Components
import FileRow from "../FileRow/FileRow"

// Actions
import { getMyPhotos } from "@/actions/actions"

const FileList = async () => {
  const photos: Photo[] = await getMyPhotos()
  return (
    <div className="scrollable-rows">
      {photos.map((photo) => (
        <FileRow key={photo.id} photo={photo} />
      ))}

    </div>
  )
}

export default FileList