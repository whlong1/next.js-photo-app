// Next/React
import { useState } from "react"
import Image from "next/image"

interface DragAndDropProps {
  children: JSX.Element;
  uploadPending: boolean;
  selectAndPreview: (file: File) => void;
}

const DragAndDrop = ({ children, selectAndPreview, uploadPending }: DragAndDropProps) => {
  const [isDragActive, setIsDragActive] = useState(false)
  const dragActiveStyle = isDragActive ? "bg-slate-100" : "bg-slate-200"

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!e.dataTransfer.items || e.dataTransfer.items.length !== 1) return
    const file = e.dataTransfer.items[0].getAsFile()
    if (file) selectAndPreview(file)
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={(e) => { e.preventDefault(); setIsDragActive(true) }}
      onDragLeave={(e) => { e.preventDefault(); setIsDragActive(false) }}
      className={`flex flex-col w-full h-full center-items rounded ${dragActiveStyle}`}
    >
      <Image src="/assets/icons/upload.svg" alt="Arrow Cloud" width="64" height="64" />
      <p className="big-bold text-white mt-4">DRAG & DROP</p>
      <p className="text-white font-semibold">OR</p>
      {children}
    </div>
  )
}

export default DragAndDrop