const FileInput = ({ selectAndPreview }: { selectAndPreview: (file: File) => void; }) => {
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
      <label className="btn btn-slate" htmlFor="hiddenFileInput">
        SELECT FILE
      </label>
    </>
  )
}

export default FileInput