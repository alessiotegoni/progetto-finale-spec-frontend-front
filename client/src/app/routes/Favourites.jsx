import { Grid, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import SmartphoneCard from "../../components/SmartphoneCard";
import EmptyState from "../../components/EmptyState";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.items);

  return (
    <>
      <title>Preferiti</title>
      <Box>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          I Tuoi Preferiti
        </Typography>

        {favorites.length > 0 ? (
          <Grid container spacing={3}>
            {favorites.map((smartphone) => (
              <Grid item xs={12} sm={6} md={4} key={smartphone.id}>
                <SmartphoneCard smartphone={smartphone} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <EmptyState
            title="Non hai ancora Preferiti"
            description="Aggiungi i telefoni ai preferiti per vederli qui"
            icon={<FavoriteIcon sx={{ fontSize: 60 }} />}
            actionText="Cerca Smartphones"
            actionLink="/"
          />
        )}
      </Box>
    </>
  );
};

export default Favorites;
