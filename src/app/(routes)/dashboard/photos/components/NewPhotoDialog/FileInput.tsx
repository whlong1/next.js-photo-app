interface FileInputProps {
  selectAndPreview: (file: File) => void;
  setIsDragActive: (bool: boolean) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement | HTMLLabelElement>) => void;
}
const FileInput = (props: FileInputProps) => {
  const { selectAndPreview, handleDrop, setIsDragActive } = props

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) selectAndPreview(file)
  }

  return (
    <>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="hiddenFileInput"
        onChange={handleChange}
      />
      <label
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragActive(true) }}
        onDragEnter={(e) => { e.preventDefault(); setIsDragActive(true) }}
        onDragLeave={(e) => { e.preventDefault(); e.stopPropagation() }}
        className="btn btn-slate pointer-events-auto" htmlFor="hiddenFileInput"
      >
        SELECT FILE
      </label>
    </>
  )
}

export default FileInput