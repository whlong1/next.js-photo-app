// Next/React
import { useState } from "react"
import Image from "next/image"

interface DragAndDropProps {
  children: JSX.Element;
  isFileSelected: boolean;
  selectAndPreview: (file: File) => void;
}

const DragAndDrop = ({ children, isFileSelected, selectAndPreview }: DragAndDropProps) => {
  const [isDragActive, setIsDragActive] = useState(false)
  const dragActiveStyle = isDragActive ? "bg-green-100" : "bg-red-200"

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!e.dataTransfer.items || e.dataTransfer.items.length !== 1) return
    const file = e.dataTransfer.items[0].getAsFile()
    if (file) selectAndPreview(file)
  }

  if (isFileSelected) return (
    <div
      className={`w-full h-full flex flex-col center-items rounded`}
    >
      <Image src="/assets/icons/upload.svg" alt="Arrow Cloud" width="64" height="64" />
      <p className="big-bold text-white mt-4">Thanks</p>
    </div>
  )

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={(e) => { e.preventDefault(); setIsDragActive(true) }}
      onDragLeave={(e) => { e.preventDefault(); setIsDragActive(false) }}
      className={`w-full h-full flex flex-col center-items rounded ${dragActiveStyle}`}
    >
      <Image src="/assets/icons/upload.svg" alt="Arrow Cloud" width="64" height="64" />
      <p className="big-bold text-white mt-4">DRAG & DROP</p>
      <p className="text-white font-semibold">OR</p>
      {children}
    </div>
  )
}

export default DragAndDrop