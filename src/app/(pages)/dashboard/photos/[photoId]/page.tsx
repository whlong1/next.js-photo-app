import { fetchPhotoById } from "@/services/userService"


interface PhotoDetailsProps { params: { photoId: string } }
const PhotoDetails = async ({ params: { photoId } }: PhotoDetailsProps) => {

  const photoData = await fetchPhotoById(photoId)

  console.log("DETAILS", photoData)
  return (
    <>
      <h1>PHOTO DETAILS</h1>
      {JSON.stringify(photoData)}
    </>
  )
}

export default PhotoDetails