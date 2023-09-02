// Components
import FilterNav from "./components/FilterNav"

const PhotosLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex">
      <FilterNav />
      {children}
    </main>
  )
}

export default PhotosLayout