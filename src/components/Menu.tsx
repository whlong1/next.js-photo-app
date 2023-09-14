"use client"

// Hooks
import { useState } from "react"

// Components
import Image from "next/image"

// Types
import { MenuElements } from "@/types/elements"

const Menu = ({ menuElements }: { menuElements: MenuElements }) => {
  const [isOpen, setIsOpen] = useState(true)

  // Certain menu items are hidden when closed:
  const toggleHiddenClass = isOpen ? "" : "hidden"
  // Menu contracts to a width of 62px when closed
  const toggleWidthClass = isOpen ? "" : "w-[62px]"
  // Slide out transition:
  const transitionClass = "transition-all duration-300 ease-in-out"

  return (
    <nav className={`side-nav ${toggleWidthClass} ${transitionClass}`}>
      <header className="header">
        <div className={toggleHiddenClass}>
          {menuElements.name}
        </div>
        <button
          className="w-7 h-7 border rounded ml-auto hover:bg-slate-100 active:bg-slate-200 flex items-center justify-center"
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