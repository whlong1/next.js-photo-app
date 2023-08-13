const FileInput = ({ selectAndPreview  }: { selectAndPreview : (file: File) => void; }) => {

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]!
    selectAndPreview (file)
  }

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleChange}
    />
  )
}

export default FileInput