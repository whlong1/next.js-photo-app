// Types
import { Photo } from "@/types/models"

// Actions
import { getMyPhotos } from "@/actions/actions"

// Components
import PhotoRow from "./components/PhotoRow/PhotoRow"

const DashboardPhotos = async () => {
  const myPhotos: Photo[] = await getMyPhotos()

  const photoDashboardHeaderClassNames = `
    p-4 
    h-[45px]
    flex 
    w-full 
    text-xs
    border-b
    items-center
    bg-slate-100
  `

  return (
    <>
      <header className={photoDashboardHeaderClassNames}>
        <p>File</p>
        <p>Public</p>
        <p>Date Uploaded</p>
      </header>
      {myPhotos.map((photo) => (
        <PhotoRow key={photo.id} photo={photo} />
      ))}
    </>
  )
}

export default DashboardPhotos