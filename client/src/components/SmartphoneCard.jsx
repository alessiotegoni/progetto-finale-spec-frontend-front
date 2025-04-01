import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  IconButton,
  Box,
  Chip,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  CompareArrows as CompareIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { useTheme } from "@mui/material/styles";
import {
  addFavorite,
  removeFavorite,
} from "../lib/redux/slices/favoritesSlice";
import { addToComparison } from "../lib/redux/slices/comparisonSlice";

const SmartphoneCard = ({ smartphone }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const comparisonItems = useSelector((state) => state.comparison.items);

  const isFavorite = favorites.some((item) => item.id === smartphone.id);
  const isInComparison = comparisonItems.some(
    (item) => item.id === smartphone.id
  );
  const isComparisonFull = comparisonItems.length >= 2;

  const handleToggleFavorite = () => {
    const action = isFavorite
      ? removeFavorite.bind(smartphone.id)
      : addFavorite.bind(smartphone);

    dispatch(action);
  };

  const handleAddToComparison = () => {
    if (!isInComparison && !isComparisonFull) {
      dispatch(addToComparison(smartphone));
    }
  };

  return (
    <Card sx={{ position: "relative" }}>
      <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}>
        <IconButton
          onClick={handleToggleFavorite}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            },
          }}
          size="small"
        >
          {isFavorite ? (
            <FavoriteIcon color="secondary" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </Box>

      <CardMedia
        component="img"
        height="200"
        image={smartphone.image}
        alt={smartphone.name}
        sx={{ objectFit: "contain", p: 2, backgroundColor: "#f5f5f5" }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {smartphone.name}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Chip
            label={smartphone.category}
            size="small"
            sx={{
              backgroundColor:
                smartphone.category === "iOS"
                  ? theme.palette.primary.light + "30"
                  : theme.palette.secondary.light + "30",
              color:
                smartphone.category === "iOS"
                  ? theme.palette.primary.dark
                  : theme.palette.secondary.dark,
            }}
          />
          <Typography variant="h6" color="text.secondary">
            ${smartphone.price}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary">
          {smartphone.displaySize}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          component={Link}
          to={`/details/${smartphone.id}`}
          size="small"
          variant="outlined"
          startIcon={<InfoIcon />}
          sx={{ mr: 1 }}
        >
          Dettagli
        </Button>

        <Button
          size="small"
          variant={isInComparison ? "contained" : "outlined"}
          color={isInComparison ? "primary" : "inherit"}
          startIcon={<CompareIcon />}
          onClick={handleAddToComparison}
          disabled={isComparisonFull && !isInComparison}
          sx={{ ml: "auto" }}
        >
          Compara
        </Button>
      </CardActions>
    </Card>
  );
};

export default SmartphoneCard;
