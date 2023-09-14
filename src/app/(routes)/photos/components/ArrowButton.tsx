// Components
import Image from "next/image"

const ArrowButton = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <button className="flex items-center justify-center w-7 h-7 rounded opacity-25">
      <Image
        width={8}
        height={8}
        priority={true}
        alt="Arrow Icon"
        src={`/assets/icons/arrow-${isOpen ? "y" : "x"}.svg`}
      />
    </button>
  )
}

export default ArrowButton