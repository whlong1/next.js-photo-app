const FilePreviewRow = () => {

  const noFileContainer = (
    <div className="container-row mt-4 rounded">
      <img src="" alt="" className="thumbnail" />
      <div className="ml-4 w-full pr-4">
        <p className="text-xs">No file has been uploaded</p>
      </div>
    </div>
  )

  return (
    <div className="container-row mt-4 rounded">
      <img src="" alt="" className="thumbnail" />
      <div className="ml-4 w-full pr-4">
        <p className="text-sm">Filename</p>
        <p className="text-xs">Filesize</p>
      </div>
      <button className="row-button">Remove</button>
    </div>
  )
}

export default FilePreviewRow