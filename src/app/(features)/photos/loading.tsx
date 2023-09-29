// Components
import PhotosPageHeader from "./components/PhotosPageHeader/PhotosPageHeader"

const Loading = () => {
  return (
    <section className="flex flex-col w-full">
      <PhotosPageHeader activeParams={[]} />
      <section className="basic-grid">
        {Array(20).fill("").map((element, idx) => (
          <div key={idx} role="status" className="w-full h-full bg-slate-200 animate-pulse">
          </div>
        ))}
      </section>
    </section>
  )
}

export default Loading