const PhotosLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex">
      <section className="flex flex-col w-full">
        {children}
      </section>
    </main>
  )
}

export default PhotosLayout