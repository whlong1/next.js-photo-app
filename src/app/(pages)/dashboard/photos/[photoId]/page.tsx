
interface PhotoDetailsProps { params: { photoId: string } }
const PhotoDetails = ({ params: { photoId } }: PhotoDetailsProps) => {

  console.log("DETAILS", photoId)
  return (
    <>
      <h1>PHOTO DETAILS</h1>
    </>
  )
}

export default PhotoDetails