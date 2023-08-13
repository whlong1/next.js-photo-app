// React
import { useState } from "react"

interface DragAndDropProps { handleFile: (file: File) => void; uploadPending: boolean }

const DragAndDrop = ({ handleFile, uploadPending }: DragAndDropProps) => {
  const [isDragActive, setIsDragActive] = useState(false)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!e.dataTransfer.items || e.dataTransfer.items.length !== 1) return
    const file = e.dataTransfer.items[0].getAsFile()!
    handleFile(file)
  }

  return (
    <div
      className={`w-full h-96 border-4 border-blue ${isDragActive ? "bg-gray-200" : "bg-gray-500"}`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={(e) => { e.preventDefault(); setIsDragActive(true) }}
      onDragLeave={(e) => { e.preventDefault(); setIsDragActive(false) }}
    >
      {uploadPending ? <p>Pending</p> : <p>DRAG N DROP</p>}
    </div>
  )
}

export default DragAndDrop