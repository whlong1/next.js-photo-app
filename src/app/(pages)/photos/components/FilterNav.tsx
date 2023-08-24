import Link from "next/link"
const FilterNav = () => {
  const sectionClassNames = "flex flex-col mb-4"

  return (
    <nav className="flex flex-col border w-80">
      <header className="flex justify-between border-b">
        <h2>FILTERS</h2>
        <button>CLEAR</button>
      </header>
      <section className={sectionClassNames}>
        <h3>Filter Section Title</h3>
        <Link className="link" href="/">Tag Example</Link>
        <Link className="link" href="/">Tag Example</Link>
        <Link className="link" href="/">Tag Example</Link>
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