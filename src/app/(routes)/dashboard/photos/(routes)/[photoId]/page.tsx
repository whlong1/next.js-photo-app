// import { fetchPhotoById } from "@/services/userService"

interface PhotoDetailsProps { params: { photoId: string } }
const PhotoDetails = async ({ params: { photoId } }: PhotoDetailsProps) => {

  // const photo = await fetchPhotoById(photoId)

  // console.log("DETAILS", photo)

  return (
    <>
      <h1>PHOTO DETAILS</h1>
      {/* <div>
        {photo.url && photo.title &&
          <img src={photo.url} alt={photo.title} />
        }
      </div>
      <div>
        {JSON.stringify(photo)}
      </div> */}
    </>
  )
}

export default PhotoDetails