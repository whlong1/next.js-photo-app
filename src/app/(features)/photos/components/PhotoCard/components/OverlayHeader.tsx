// Components
import IconButton from "./IconButton"

const OverlayHeader = ({ photoId }: { photoId: string }) => {
  return (
    <header className="absolute top-4 right-4 flex items-center">
      <IconButton
        name="favorite"
        photoId={photoId}
        icon="/assets/icons/heart.svg"
      />
      {/* <IconButton
        photoId={photoId}
        icon="/assets/icons/bookmark.svg"
      /> */}
    </header>
  )
}

export default OverlayHeader