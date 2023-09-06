"use client"

// Hooks
import { useState } from "react"

// Components
import Link from "next/link"

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false)

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
        <Link href="/dashboard" className={toggleHiddenClass}>
          <h2 className="text-sm">Dashboard</h2>
        </Link>
        <button className={btnClass} onClick={() => setIsOpen(!isOpen)}>
        </button>
      </header>
      <div className={toggleHiddenClass}>
        <Link className="nav-item" href="/dashboard/account">Account</Link>
        <Link className="nav-item" href="/dashboard/photos">Photos</Link>
        <Link className="nav-item" href="/dashboard/favorites">Favorites</Link>
        <Link className="nav-item" href="/dashboard/favorites">Analytics</Link>
      </div>
    </nav>
  )
}

export default Menu