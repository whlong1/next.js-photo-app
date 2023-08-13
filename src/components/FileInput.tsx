const FileInput = ({ selectAndPreview }: { selectAndPreview: (file: File) => void; }) => {

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) selectAndPreview(file)
  }

  const style = `
    px-4 
    py-2 
    text-white
    bg-gray-900 
    cursor-pointer
    border
    rounded
    border-grey
    hover:bg-gray-300 
    transition-colors 
    duration-200
    font-semibold
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
      <label className={style} htmlFor="hiddenFileInput">
        SELECT FILE
      </label>
    </div>
  )
}

export default FileInput