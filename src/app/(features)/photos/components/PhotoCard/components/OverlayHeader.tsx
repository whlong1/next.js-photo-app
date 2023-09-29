// Components
import IconButton from "./IconButton"

const OverlayHeader = () => {
  return (
    <header className="absolute top-4 right-4 flex items-center">
      <IconButton icon="/assets/icons/heart.svg" />
      <IconButton icon="/assets/icons/bookmark.svg" />
    </header>
  )
}

export default OverlayHeader