// React
import { useState } from "react"

interface DragAndDropProps {
  children: JSX.Element;
  uploadPending: boolean;
  selectAndPreview: (file: File) => void;
}

const DragAndDrop = ({ children, selectAndPreview, uploadPending }: DragAndDropProps) => {
  const [isDragActive, setIsDragActive] = useState(false)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!e.dataTransfer.items || e.dataTransfer.items.length !== 1) return
    const file = e.dataTransfer.items[0].getAsFile()
    if (file) selectAndPreview(file)
  }

  const style = `
    h-96 
    w-full 
    border-4 
    border-blue 
    ${isDragActive ? "bg-gray-200" : "bg-gray-500"}
  `

  return (
    <div
      className={style}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={(e) => { e.preventDefault(); setIsDragActive(true) }}
      onDragLeave={(e) => { e.preventDefault(); setIsDragActive(false) }}
    >
      {uploadPending ? <p>Pending</p> : <p>DRAG N DROP</p>}
      {children}
    </div>
  )
}

export default DragAndDrop