const OverlayHeader = () => {
  const buttonClassNames = "w-7 h-7 leading-none bg-white text-black rounded bg-opacity-75 hover:bg-opacity-90 transition text-sm"

  return (
    <header className="absolute top-4 right-4">
      <button className={buttonClassNames}>
        X
      </button>
    </header>
  )
}

export default OverlayHeader