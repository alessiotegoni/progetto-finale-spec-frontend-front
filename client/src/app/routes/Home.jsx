import React from "react";
import { Grid, Typography, Box, CircularProgress, Alert } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useSearchParams } from "react-router";
import { useGetSmartphonesQuery } from "../../lib/redux/services/smartphonesApi";
import EmptyState from "../../components/EmptyState";
import SearchBar from "../../components/SearchBar";
import SmartphoneCard from "../../components/SmartphoneCard";

const Home = () => {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const os = searchParams.get("os") || "";
  const sort = searchParams.get("sort") || "";

  const {
    data: smartphones,
    isLoading,
    isError,
  } = useGetSmartphonesQuery({ search, os, sort });

  const filteredSmartphones = React.useMemo(() => {
    if (!smartphones) return [];

    let result = [...smartphones];

    if (os) result = result.filter((phone) => phone.os === os);

    if (sort) {
      switch (sort) {
        case "title_asc":
          result.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "title_desc":
          result.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case "price_asc":
          result.sort((a, b) => a.price - b.price);
          break;
        case "price_desc":
          result.sort((a, b) => b.price - a.price);
          break;
        default:
          console.warn(
            "Sort must be a value between: title_asc, title_desc, price_asc, price_desc"
          );

          break;
      }
    }

    return result;
  }, [smartphones, os, sort]);

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        Esplora Smartphones
      </Typography>

      <SearchBar />

      {isError && (
        <Alert severity="error" sx={{ mb: 4 }}>
          Errore nel caricamento degli smartphones. Perfavore ritenta più tardi.
        </Alert>
      )}

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : filteredSmartphones.length ? (
        <Grid container spacing={3}>
          {filteredSmartphones.map((smartphone) => (
            <Grid item xs={12} sm={6} md={4} key={smartphone.id}>
              <SmartphoneCard smartphone={smartphone} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <EmptyState
          title="Nessun telefono trovato"
          description="Prova a cambiare i criteri di ricerca"
          icon={<SearchIcon sx={{ fontSize: 60 }} />}
        />
      )}
    </Box>
  );
};

export default Home;
