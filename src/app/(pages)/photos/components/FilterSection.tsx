// Components
import QueryTab from "./QueryTab"

const FilterSection = ({ queryKey, queryValues }: { queryKey: string, queryValues: string[] }) => {
  const sectionTitle = queryKey[0].toUpperCase() + queryKey.slice(1)

  return (
    <section className="flex flex-col mb-4">
      <h3>{sectionTitle}</h3>
      <ul className="list-none">
        {queryValues.map((val) => (
          <QueryTab queryKey={queryKey} queryValue={val} />
        ))}
      </ul>
    </section>
  )
}

export default FilterSection