// Components
import { Suspense } from "react"
import UploadModal from "../components/UploadModal/UploadModal"
import DashboardPhotoList from "../components/DashboardPhotoList/DashboardPhotoList"

// Types 
import { SearchParams } from "@/types/params"

interface DashboardPhotosProps { searchParams: SearchParams; }
const DashboardPhotos = async ({ searchParams }: DashboardPhotosProps) => {

  return (
    <section className="h-full">
      <header className="p-4 h-[45px] flex w-full text-xs border-b items-center">
        <p>File</p>
        <p>Public</p>
        <p>Date Uploaded</p>
        <p>Sort goes here</p>
      </header>

      {searchParams.new && <UploadModal />}

      <Suspense fallback={<p>Loading</p>}>
        <DashboardPhotoList />
      </Suspense>
    </section>
  )
}

export default DashboardPhotos