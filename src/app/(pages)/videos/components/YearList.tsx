"use client"

// Hooks
import { useQueryManager } from "@/hooks/useQueryManager"

const YearList = () => {
  const currentYear = new Date().getFullYear()
  const { queryParams, setQueryParams } = useQueryManager()

  const getYearsFrom = (startYear: number): string[] => {
    const yearStringArray = []
    for (let year = startYear; year <= currentYear; year++) {
      yearStringArray.push(year.toString())
    }
    return yearStringArray
  }

  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setQueryParams("year", target.value)
  }

  return (
    <section>
      <h2>Year</h2>
      <select name="year" onChange={handleChange}>
        <option value="">ALL</option>
        {getYearsFrom(1900).map((yearStr) => (
          <option key={yearStr} value={yearStr}>{yearStr}</option>
        ))}
      </select>
    </section>
  )
}

export default YearList