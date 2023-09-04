// Components
import PhotosPageHeader from "./components/PhotosPageHeader"

const Loading = () => {
  return (
    <section className="flex flex-col w-full">
      <PhotosPageHeader activeParams={[]} />
      <section className="basic-grid">
        {Array(20).fill("").map((element, idx) => (
          <div role="status" className="w-full h-full bg-slate-200 animate-pulse">
          </div>
        ))}
      </section>
    </section>
  )
}

export default Loading