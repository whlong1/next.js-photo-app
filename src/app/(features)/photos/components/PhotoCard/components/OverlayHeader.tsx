import Image from "next/image"

const OverlayHeader = () => {
  const buttonClassNames = "w-7 h-7 leading-none bg-white text-black rounded bg-opacity-60 hover:bg-opacity-90 transition text-sm ml-3 flex items-center justify-center"

  return (
    <header className="absolute top-4 right-4 flex items-center">
      <button className={buttonClassNames}>
        <Image 
          src="/assets/icons/heart.svg" 
          alt="Heart icon"
          width={18}
          height={18}
        />
      </button>
      <button className={buttonClassNames}>
        <Image 
          src="/assets/icons/bookmark.svg" 
          alt="Heart icon"
          width={18}
          height={18}
        />
      </button>
    </header>
  )
}

export default OverlayHeader