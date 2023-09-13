// Components
import Menu from "@/components/Menu"
import FilterNav from "./components/FilterNav"
import FilterSection from "./components/FilterSection"
import RangeSelector from "./components/RangeSelector"
import SwatchSelector from "./components/SwatchSelector"

// Constants
import { PHOTO_CATEGORIES, ASPECT_RATIOS } from "@/lib/constants"

// Types
import { MenuElements } from "@/types/elements"

const PhotosLayout = ({ children }: { children: React.ReactNode }) => {
  const menuElements: MenuElements = {
    name: <h2 className="text-black text-sm">Filters</h2>,
    content: (
      <>
        <FilterSection
          queryKey="category"
          sectionTitle="Category"
          queryValues={PHOTO_CATEGORIES}
        />
        <FilterSection
          queryKey="aspectRatio"
          sectionTitle="Aspect Ratio"
          queryValues={ASPECT_RATIOS}
        />
        <FilterSection
          queryKey="mimeType"
          sectionTitle="File Type"
          queryValues={["PNG", "JPEG"]}
        />
        <FilterSection
          queryKey="brightness"
          sectionTitle="Brightness"
          queryValues={["light", "dark"]}
        />
        <SwatchSelector />
        <RangeSelector
          queryKey="hueRange"
          sectionTitle="Color Range"
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