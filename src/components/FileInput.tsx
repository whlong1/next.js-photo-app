const FileInput = ({ selectAndPreview }: { selectAndPreview: (file: File) => void; }) => {

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) selectAndPreview(file)
  }

  const labelStyle = `
    px-4 
    py-2 
    text-white
    cursor-pointer
    border-2
    rounded
    border-white
    hover:bg-slate-500 
    transition-colors 
    duration-200
    font-bold
    w-full
    center-items
    mt-4
  `
  return (
    <div className="w-[220px] center-items">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="hiddenFileInput"
        onChange={handleChange}
      />
      <label className={labelStyle} htmlFor="hiddenFileInput">
        SELECT FILE
      </label>
    </div>
  )
}

export default FileInput