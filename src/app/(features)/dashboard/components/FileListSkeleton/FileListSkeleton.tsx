const FileListSkeleton = () => {
  return (
    Array(10).fill("").map((element, idx) => (
      <div key={idx} className="row-container">
        <div className="thumbnail"></div>
        <section className="flex ml-auto">
          <button className="row-ui-element min-w-[77.5px] min-h-[26px]"></button>
          <button className="row-ui-element min-w-[71.38px] min-h-[26px]"></button>
        </section>
      </div>
    ))
  )
}

export default FileListSkeleton