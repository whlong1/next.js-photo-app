// Next/React
import { useState } from "react"
import Image from "next/image"

import FileInput from "./FileInput";

interface DragAndDropProps {
  isFileSelected: boolean;
  selectAndPreview: (file: File) => void;
}

const DragAndDrop = ({ isFileSelected, selectAndPreview }: DragAndDropProps) => {
  const [isDragActive, setIsDragActive] = useState(false)
  const dragActiveStyle = isDragActive ? "bg-slate-300" : "bg-slate-200"

  const handleDrop = (e: React.DragEvent<HTMLDivElement | HTMLLabelElement>) => {
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
      onDragLeave={(e) => { console.log("Leaving"); e.preventDefault(); setIsDragActive(false) }}
      className={`w-full h-full flex flex-col center-items rounded border border-slate-800 border-opacity-10 sm:py-8 ${dragActiveStyle}`}
    >
      <Image
        width="64"
        height="64"
        alt="Arrow Cloud"
        src="/assets/icons/upload.svg"
        className="pointer-events-none drop-shadow"
      />
      <p className="big-bold text-white mt-3 pointer-events-none drop-shadow">DRAG & DROP</p>
      <p className="text-white text-base font-semibold mb-3 pointer-events-none drop-shadow">OR</p>
      <FileInput selectAndPreview={selectAndPreview} handleDrop={handleDrop} setIsDragActive={setIsDragActive} />
    </div>
  )
}

export default DragAndDrop