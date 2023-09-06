// Components
import DragAndDrop from "./DragAndDrop"
import FilePreviewRow from "./FilePreviewRow"

interface PhotoUploaderProps {
  file: File | null;
  previewURL: string;
  handleUploadReset: () => void;
  selectAndPreview: (file: File) => void;
}

const PhotoUploader = ({ file, previewURL, handleUploadReset, selectAndPreview }: PhotoUploaderProps) => {

  return (
    <div className="flex flex-col w-full md:w-[50%] bg-slate-50 items-center p-4 md:border-r md:border-b-0 border-b h-full">
      <DragAndDrop selectAndPreview={selectAndPreview} isFileSelected={!!file} />
      <FilePreviewRow file={file} previewURL={previewURL} handleUploadReset={handleUploadReset} />
    </div>
  )
}

export default PhotoUploader