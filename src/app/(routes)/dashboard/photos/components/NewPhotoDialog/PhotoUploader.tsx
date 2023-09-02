// Components
import FileInput from "./FileInput"
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
    <div className="flex flex-col w-[50%] h-full bg-slate-50 items-center p-4 border-r">
      <DragAndDrop selectAndPreview={selectAndPreview} isFileSelected={!!file}>
        <FileInput selectAndPreview={selectAndPreview} />
      </DragAndDrop>
      <FilePreviewRow file={file} previewURL={previewURL} handleUploadReset={handleUploadReset} />
    </div>
  )
}

export default PhotoUploader