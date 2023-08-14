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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!e.dataTransfer.items || e.dataTransfer.items.length !== 1) return
    const file = e.dataTransfer.items[0].getAsFile()
    if (file) selectAndPreview(file)
  }
  // h-[360px] 
  // w-[500px] 

  const style = `
    rounded
    border-2
    border-white
    
    center-items
    border-dashed

  `
    // custom-dashed
    // ${isDragActive ? "bg-gray-200" : "bg-gray-500"}

  return (
    <div className="bg-slate-400 p-2 w-full">
      <div
        className={style}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => { e.preventDefault(); setIsDragActive(true) }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragActive(false) }}
      >
        <Image src="/icons/upload.svg" alt="Arrow Cloud" width="64" height="64" />
        <p className="big-bold text-white mt-4">DRAG & DROP</p>
        <p className="text-white font-semibold mt-1">OR</p>
        {children}
      </div>
    </div>
  )
}

export default DragAndDrop