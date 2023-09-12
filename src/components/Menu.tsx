"use client"

// Hooks
import { useState } from "react"

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
  const btnClass = "w-7 h-7 border rounded ml-auto hover:bg-slate-100 active:bg-slate-200"

  return (
    <nav className={`side-nav ${toggleWidthClass} ${transitionClass}`}>
      <header className="header">
        <div className={toggleHiddenClass}>
          {menuElements.name}
        </div>
        <button className={btnClass} onClick={() => setIsOpen(!isOpen)}>
        </button>
      </header>
      <div className={`${toggleHiddenClass} scrollable`}>
        {menuElements.content}
      </div>
    </nav>
  )
}

export default Menu