interface FilterChipProps { param: { queryKey: string, queryValue: string } }

const FilterChip = ({ param }: FilterChipProps) => {
  const chipText = param.queryValue[0].toUpperCase() + param.queryValue.slice(1)
  return (
    <div className="inline-flex items-center justify-start rounded bg-slate-500 bg-opacity-50 text-white text-sm py-1 px-3">
      <p>{chipText}</p>
      <button className="ml-2">X</button>
    </div>
  )
}

export default FilterChip