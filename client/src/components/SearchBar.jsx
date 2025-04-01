import { useState, useEffect, useCallback } from "react";
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
import {
  Search as SearchIcon,
  Sort as SortIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";
import debounce from "lodash.debounce";

const SearchBar = ({ onSearch, onCategoryChange, onSortChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearch(value);
    }, 500),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);

    return () => debouncedSearch.cancel();
  }, [searchTerm, debouncedSearch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    onCategoryChange(value);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSort(value);
    onSortChange(value);
  };

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
              placeholder="Search smartphones..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Paper>

          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl size="small" fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={category}
                label="Category"
                onChange={handleCategoryChange}
                startAdornment={
                  <FilterIcon
                    fontSize="small"
                    sx={{ mr: 1, color: "action.active" }}
                  />
                }
              >
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value="iOS">iOS</MenuItem>
                <MenuItem value="Android">Android</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              size="small"
              sx={{ borderRadius: theme.shape.borderRadius }}
              fullWidth
            >
              <InputLabel id="sort-label">Sort By</InputLabel>
              <Select
                labelId="sort-label"
                value={sort}
                label="Sort By"
                onChange={handleSortChange}
                startAdornment={
                  <SortIcon
                    fontSize="small"
                    sx={{ mr: 1, color: "action.active" }}
                  />
                }
              >
                <MenuItem value="">Default</MenuItem>
                <MenuItem value="name_asc">Name (A-Z)</MenuItem>
                <MenuItem value="name_desc">Name (Z-A)</MenuItem>
                <MenuItem value="price_asc">Price (Low to High)</MenuItem>
                <MenuItem value="price_desc">Price (High to Low)</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </>
      ) : (
        // Desktop layout - inline
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
            placeholder="Search smartphones..."
            value={searchTerm}
            onChange={handleSearchChange}
          />

          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={category}
              label="Category"
              onChange={handleCategoryChange}
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="iOS">iOS</MenuItem>
              <MenuItem value="Android">Android</MenuItem>
            </Select>
          </FormControl>

          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              value={sort}
              label="Sort By"
              onChange={handleSortChange}
            >
              <MenuItem value="">Default</MenuItem>
              <MenuItem value="name_asc">Nome (A-Z)</MenuItem>
              <MenuItem value="name_desc">Nome (Z-A)</MenuItem>
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
