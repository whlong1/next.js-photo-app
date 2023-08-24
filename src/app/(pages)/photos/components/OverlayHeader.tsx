const OverlayHeader = () => {
  const buttonClassNames = "w-7 h-7 leading-none bg-white text-black rounded bg-opacity-60 hover:bg-opacity-90 transition text-sm ml-3"

  return (
    <header className="absolute top-4 right-4">
      <button className={buttonClassNames}></button>
      <button className={buttonClassNames}></button>
    </header>
  )
}

export default OverlayHeader