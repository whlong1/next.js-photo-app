// Components
import Link from "next/link"
import QueryTab from "./QueryTab"

const FilterNav = () => {
  const sectionClassNames = "flex flex-col mb-4"

  return (
    <nav className="flex flex-col border w-80">
      <header className="flex justify-between border-b">
        <h2>FILTERS</h2>
        <Link href="/photos">CLEAR</Link>
      </header>
      <section className={sectionClassNames}>
        <h3>CATEGORY</h3>
        <ul className="list-none">
          <QueryTab queryKey="category" queryValue="people" />
          <QueryTab queryKey="category" queryValue="nature" />
          <QueryTab queryKey="category" queryValue="food" />
        </ul>
      </section>
      <section className={sectionClassNames}>
        <h3>Filter Section Title</h3>
        <Link className="link" href="/">Tag Example</Link>
      </section>
      <section className={sectionClassNames}>
        <h3>Filter Section Title</h3>
        <Link className="link" href="/">Tag Example</Link>
      </section>
    </nav>
  )
}
export default FilterNav