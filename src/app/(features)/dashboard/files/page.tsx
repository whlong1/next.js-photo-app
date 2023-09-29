// Components
import Link from "next/link"
import { Suspense } from "react"
import FileList from "../components/FileList/FileList"
import UploadModal from "../components/UploadModal/UploadModal"
import PhotoListSkeleton from "../components/FileListSkeleton/FileListSkeleton"

// Types 
import { SearchParams } from "@/types/params"

interface FilesDashboardProps { searchParams: SearchParams; }
const FilesDashboard = async ({ searchParams }: FilesDashboardProps) => {

  return (
    <>
      <header className="header">
        <h1>Recent Files</h1>
        <Link className="ml-auto header-element" href="/dashboard/files?new=true">
          New Photo
        </Link>
      </header>
      <section className="h-full">
        {searchParams.new && <UploadModal />}
        <Suspense fallback={<PhotoListSkeleton />}>
          <FileList />
        </Suspense>
      </section>
    </>
  )
}

export default FilesDashboard