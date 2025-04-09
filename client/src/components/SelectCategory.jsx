import { MenuItem, Select } from "@mui/material";

export const categories = [
  { name: "smartphone", label: "Telefoni" },
  { name: "tablet", label: "Tablet" },
  { name: "smartwatch", label: "Orologi smart" },
];

export default function SelectCategory({
  value,
  onChange,
  showAll = true,
  ...props
} = {}) {
  return (
    <Select
      label="Categorie"
      labelId="category-label"
      value={value}
      onChange={onChange}
      {...props}
    >
      {showAll && <MenuItem value="">Tutte</MenuItem>}
      {categories.map(({ name, label }) => (
        <MenuItem value={name}>{label}</MenuItem>
      ))}
    </Select>
  );
}
