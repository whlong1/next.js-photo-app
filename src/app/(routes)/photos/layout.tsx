// Components
import Menu from "@/components/Menu"
import FilterNav from "./components/FilterNav"
import FilterSection from "./components/FilterSection"

// Constants
import { PHOTO_CATEGORIES, ASPECT_RATIOS } from "@/lib/constants"

// Types
import { MenuElements } from "@/types/elements"

const PhotosLayout = ({ children }: { children: React.ReactNode }) => {
  const menuElements: MenuElements = {
    name: <h2 className="text-sm">Browse</h2>,
    content: (
      <>
        <FilterSection
          queryKey="category"
          queryValues={PHOTO_CATEGORIES}
        />
        <FilterSection
          queryKey="Aspect Ratio"
          queryValues={ASPECT_RATIOS}
        />
      </>
    )
  }

  return (
    <main className="flex">
      <Menu menuElements={menuElements} />
      {children}
    </main>
  )
}

export default PhotosLayout