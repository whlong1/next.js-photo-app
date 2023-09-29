"use client"

// Hooks
import { useState } from "react"

// Components
import Image from "next/image"

// Types
import { MenuElements } from "@/types/elements"

const Menu = ({ menuElements }: { menuElements: MenuElements }) => {
  const [isOpen, setIsOpen] = useState(true)
  const toggleHiddenClass = isOpen ? "" : "hidden"
  const toggleWidthClass = isOpen ? "" : "w-[62px]"
  const transitionClass = "transition-all duration-300 ease-in-out"
  const buttonClass = "w-7 h-7 border rounded ml-auto hover:bg-slate-100 active:bg-slate-200 flex items-center justify-center"
  
  return (
    <nav className={`side-nav ${toggleWidthClass} ${transitionClass}`}>
      <header className="header">
        <div className={toggleHiddenClass}>
          {menuElements.name}
        </div>
        <button
          className={buttonClass}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            width={20}
            height={20}
            alt="Filter icon"
            className="opacity-25"
            src="/assets/icons/filter.svg"
          />
        </button>
      </header>
      <div className={`${toggleHiddenClass} scrollable`}>
        {menuElements.content}
      </div>
    </nav>
  )
}

export default Menu