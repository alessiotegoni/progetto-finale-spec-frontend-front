import {
  Paper,
  InputBase,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import debounce from "lodash.debounce";
import { useCallback } from "react";
import { useSearchParams } from "react-router";
import SelectCategory from "./SelectCategory";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";

  const setFilters = useCallback(
    (value, filter) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);

        if (value) newParams.set(filter, value);
        else newParams.delete(filter);

        return newParams;
      });
    },
    [setSearchParams]
  );

  const debouncedSearch = useCallback(
    debounce((value) => setFilters(value, "search"), 500),
    [setFilters]
  );
  const handleSearchChange = (e) => debouncedSearch(e.target.value);

  const handleCategoryChange = (e) => setFilters(e.target.value, "category");
  const handleSortChange = (e) => setFilters(e.target.value, "sort");

  return (
    <Box sx={{ mb: 4 }}>
      {isMobile ? (
        <>
          <Paper
            elevation={0}
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              border: "1px solid",
              borderColor: "divider",
              mb: 2,
              borderRadius: theme.shape.borderRadius,
            }}
          >
            <IconButton sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Cerca categorie..."
              defaultValue={search}
              onChange={handleSearchChange}
            />
          </Paper>

          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl size="small" fullWidth>
              <InputLabel id="category-label">Categorie</InputLabel>
              <SelectCategory value={category} onChange={handleCategoryChange} />
            </FormControl>

            <FormControl size="small" fullWidth>
              <InputLabel id="sort-label">Ordina Per</InputLabel>
              <Select
                label="Ordina Per"
                labelId="sort-label"
                value={sort}
                onChange={handleSortChange}
              >
                <MenuItem value="">Default</MenuItem>
                <MenuItem value="title_asc">Nome (A-Z)</MenuItem>
                <MenuItem value="title_desc">Nome (Z-A)</MenuItem>
                <MenuItem value="price_asc">Prezzo (Meno costoso)</MenuItem>
                <MenuItem value="price_desc">Prezzo (Piu costoso)</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </>
      ) : (
        <Paper
          elevation={0}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: theme.shape.borderRadius,
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Cerca categorie..."
            defaultValue={search}
            onChange={handleSearchChange}
          />

          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          <FormControl size="small" sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="category-label">Categorie</InputLabel>
            <SelectCategory value={category} onChange={handleCategoryChange} />
          </FormControl>

          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          <FormControl size="small" sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="sort-label">Ordina Per</InputLabel>
            <Select
              label="Ordina Per"
              labelId="sort-label"
              value={sort}
              onChange={handleSortChange}
            >
              <MenuItem value="">Default</MenuItem>
              <MenuItem value="title_asc">Nome (A-Z)</MenuItem>
              <MenuItem value="title_desc">Nome (Z-A)</MenuItem>
              <MenuItem value="price_asc">Prezzo (Meno costoso)</MenuItem>
              <MenuItem value="price_desc">Prezzo (Piu costoso)</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      )}
    </Box>
  );
};

export default SearchBar;
