// Types
import { Photo } from "@/types/models"

// Actions
import { getMyPhotos } from "@/actions/actions"

// Components
import PhotoList from "./components/PhotoList/PhotoList"
import PhotoRow from "./components/PhotoRow/PhotoRow"

const DashboardPhotos = async () => {
  const serverSidePhotoData: Photo[] = await getMyPhotos()

  return (
    <>
      <header className="p-4 h-[45px] flex w-full text-xs border-b items-center bg-slate-100">
        <p>File</p>
        <p>Public</p>
        <p>Date Uploaded</p>
      </header>
      {/* {photos.map((photo) => (
          <PhotoRow key={photo.id} photo={photo} />
        ))} */}

      <PhotoList serverSidePhotoData={serverSidePhotoData} />

      {/* <Suspense fallback={<p>Loading</p>}>
        <PhotoList />
      </Suspense> */}

    </>
  )
}

export default DashboardPhotos