// Helpers
import { formatBytes } from "@/lib/helpers"

interface FilePreviewRowProps {
  file: File | null;
  previewURL: string;
  handleUploadReset: () => void;
}

const FilePreviewRow = ({ file, previewURL, handleUploadReset }: FilePreviewRowProps) => {
  if (!file) return (
    <div className="container-row mt-4 rounded">
      <img src="" alt="" className="thumbnail" />
      <div className="ml-4 w-full pr-4">
        <p className="text-xs">No file has been uploaded</p>
      </div>
    </div>
  )

  return (
    <div className="container-row mt-4 rounded">
      <img src={previewURL} alt="Preview" className="thumbnail" />
      <div className="ml-4 w-full pr-4">
        <p className="single-line-truncate text-xs leading-tight tracking-tight">
          {file.name}
        </p>
        <p className="text-xs opacity-60 leading-tight tracking-tight">
          {formatBytes(file.size)}
        </p>
      </div>
      <button className="row-button" onClick={handleUploadReset}>
        Remove
      </button>
    </div>
  )
}

export default FilePreviewRow