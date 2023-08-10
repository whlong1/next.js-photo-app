import QueryButton from "./QueryButton"

const GenreList = () => {
  const genreList = [
    "comedy",
    "drama",
    "action",
    "romance",
    "science-fiction",
  ]
  
  return (
    <section>
      <h2>Genres</h2>
      <ul>
        {genreList.map((genreName, idx) => (
          <QueryButton
            key={idx}
            queryKey="genre"
            queryValue={genreName}
          />
        ))}
      </ul>
    </section>
  )
}

export default GenreList