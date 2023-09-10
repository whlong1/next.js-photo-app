// Components
import Menu from "@/components/Menu"
import FilterNav from "./components/FilterNav"
import FilterSection from "./components/FilterSection"
import RangeSelector from "./components/RangeSelector"

// Constants
import { PHOTO_CATEGORIES, ASPECT_RATIOS, DOMINANT_COLORS } from "@/lib/constants"

// Types
import { MenuElements } from "@/types/elements"

const PhotosLayout = ({ children }: { children: React.ReactNode }) => {
  const menuElements: MenuElements = {
    name: <h2 className="text-sm">Browse</h2>,
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
          queryKey="dominantColor"
          sectionTitle="Dominant Color"
          queryValues={DOMINANT_COLORS}
        />
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