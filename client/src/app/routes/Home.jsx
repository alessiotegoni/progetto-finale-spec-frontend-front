import React, { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Fade,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useGetSmartphonesQuery } from "../../lib/redux/services/smartphonesApi";
import SearchBar from "../../components/SearchBar";
import EmptyState from "../../components/EmptyState";
import SmartphoneCard from "../../components/SmartphoneCard";

export default function Home() {
  const [searchParams, setSearchParams] = useState({
    search: "",
    category: "",
    sort: "",
  });

  const {
    data: smartphones,
    isLoading,
    isError,
  } = useGetSmartphonesQuery(searchParams);

  const handleSearch = (searchTerm) => {
    setSearchParams((prev) => ({ ...prev, search: searchTerm }));
  };

  const handleCategoryChange = (category) => {
    setSearchParams((prev) => ({ ...prev, category }));
  };

  const handleSortChange = (sort) => {
    setSearchParams((prev) => ({ ...prev, sort }));
  };

  const filteredSmartphones = React.useMemo(() => {
    if (!smartphones) return [];

    let result = [...smartphones];

    if (searchParams.search) {
      const searchLower = searchParams.search.toLowerCase();
      result = result.filter((phone) =>
        phone.name.toLowerCase().includes(searchLower)
      );
    }

    if (searchParams.category) {
      result = result.filter(
        (phone) => phone.category === searchParams.category
      );
    }

    if (searchParams.sort) {
      switch (searchParams.sort) {
        case "name_asc":
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name_desc":
          result.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "price_asc":
          result.sort((a, b) => a.price - b.price);
          break;
        case "price_desc":
          result.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }
    }

    return result;
  }, [smartphones, searchParams]);

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        Explore Smartphones
      </Typography>

      <SearchBar
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
      />

      {isError && (
        <Alert severity="error" sx={{ mb: 4 }}>
          Error loading smartphones. Please try again later.
        </Alert>
      )}

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : filteredSmartphones.length ? (
        <Fade  in={!isLoading}>
          <Grid container spacing={3}>
            {filteredSmartphones.map((smartphone) => (
              <Grid item xs={12} sm={6} key={smartphone.id}>
                <SmartphoneCard smartphone={smartphone} />
              </Grid>
            ))}
          </Grid>
        </Fade>
      ) : (
        <EmptyState
          title="No smartphones found"
          description="Try adjusting your search or filter criteria."
          icon={<SearchIcon sx={{ fontSize: 60 }} />}
        />
      )}
    </Box>
  );
}
