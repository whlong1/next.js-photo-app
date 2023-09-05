interface FileInputProps {
  selectAndPreview: (file: File) => void;
  setIsDragActive: (bool: boolean) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement | HTMLLabelElement>) => void;
}
const FileInput = (props: FileInputProps) => {
  const { selectAndPreview, handleDrop, setIsDragActive } = props
  const labelClassNames = "btn w-[220px] text-center font-bold border-2 bg-slate-300 hover:bg-slate-400 border-white text-white" 

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
        htmlFor="hiddenFileInput"
        className={labelClassNames}
      >
        SELECT FILE
      </label>
    </>
  )
}

export default FileInput