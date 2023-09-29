// Components
import { Suspense } from "react"
import FileList from "../components/FileList/FileList"
import UploadModal from "../components/UploadModal/UploadModal"
import PhotoListSkeleton from "../components/FileListSkeleton/FileListSkeleton"

// Types 
import { SearchParams } from "@/types/params"

interface FilesDashboardProps { searchParams: SearchParams; }
const FilesDashboard = async ({ searchParams }: FilesDashboardProps) => {

  return (
    <section className="h-full">
      <header className="p-4 h-[45px] flex w-full text-xs border-b items-center">
        <p>File</p>
        <p>Public</p>
        <p>Date Uploaded</p>
        <p>Sort goes here</p>
      </header>

      {searchParams.new && <UploadModal />}

      <Suspense fallback={<PhotoListSkeleton />}>
        <FileList />
      </Suspense>
    </section>
  )
}

export default FilesDashboard