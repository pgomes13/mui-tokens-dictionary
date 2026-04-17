interface Props {
  value: string
  onChange: (v: string) => void
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <div className="search-bar">
      <input
        type="search"
        placeholder="Search tokens…"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}
