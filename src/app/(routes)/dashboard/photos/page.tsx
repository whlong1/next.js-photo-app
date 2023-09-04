// Components
import { Suspense } from "react"
import PhotoList from "./components/PhotoList/PhotoList"

const DashboardPhotos = async () => {
  return (
    <section>
      <header className="p-4 h-[45px] flex w-full text-xs border-b items-center">
        <p>File</p>
        <p>Public</p>
        <p>Date Uploaded</p>
      </header>
      <Suspense fallback={<p>Loading</p>}>
        <PhotoList />
      </Suspense>
    </section>
  )
}

export default DashboardPhotos