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
    
    center-items

    flex
    flex-col
    mt-2
    px-2

    w-full
    text-white
  `
    // custom-dashed
    // ${isDragActive ? "bg-gray-200" : "bg-gray-500"}

  return (
    <div className="bg-slate-100 p-4 rounded border w-full border-slate-200">
      <div
        className={style}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => { e.preventDefault(); setIsDragActive(true) }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragActive(false) }}
      >
        <Image src="/assets/icons/upload.svg" alt="Arrow Cloud" width="64" height="64" />
        <p className="big-bold text-white mt-4">DRAG & DROP</p>
        <p className="text-white font-semibold">OR</p>
        {children}
      </div>
    </div>
  )
}

export default DragAndDrop