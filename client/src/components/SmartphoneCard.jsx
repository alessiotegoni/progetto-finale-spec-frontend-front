import {
  Card,
  CardContent,
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
  Smartphone as SmartphoneIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Link } from "react-router";
import { useTheme } from "@mui/material/styles";
import {
  addFavorite,
  removeFavorite,
} from "../lib/redux/slices/favoritesSlice";
import { addToComparison } from "../lib/redux/slices/comparisonSlice";
import { memo, useCallback } from "react";

function SmartphoneCard({ smartphone }) {
  console.log("rendered smartphone", smartphone.title);

  const theme = useTheme();
  const dispatch = useDispatch();
  // const favorites = useSelector((state) => state.favorites.items);
  // const comparisonItems = useSelector((state) => state.comparison.items);

  const { isFavorite, isInComparison, isComparisonFull } = useSelector(
    (state) => ({
      isFavorite: state.favorites.items.some(
        (item) => item.id === smartphone.id
      ),
      isInComparison: state.comparison.items.some(
        (item) => item.id === smartphone.id
      ),
      isComparisonFull: state.comparison.items.length >= 2,
    }),
    shallowEqual
  );

  const handleToggleFavorite = useCallback(() => {
    if (isFavorite) {
      dispatch(removeFavorite(smartphone.id));
    } else {
      dispatch(addFavorite(smartphone));
    }
  }, [dispatch, isFavorite, smartphone]);

  const handleAddToComparison = useCallback(() => {
    if (!isInComparison && !isComparisonFull) {
      dispatch(addToComparison(smartphone));
    }
  }, [dispatch, isInComparison, isComparisonFull, smartphone]);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
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

      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          height: 150,
        }}
      >
        <SmartphoneIcon sx={{ fontSize: 80, color: "text.secondary" }} />
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {smartphone.title}
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
            label={smartphone.os}
            size="small"
            sx={{
              backgroundColor:
                smartphone.os === "iOS"
                  ? theme.palette.primary.light + "30"
                  : theme.palette.secondary.light + "30",
              color:
                smartphone.os === "iOS"
                  ? theme.palette.primary.dark
                  : theme.palette.secondary.dark,
            }}
          />
          <Typography variant="h6" color="text.secondary">
            ${smartphone.price}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {smartphone.brand} • {smartphone.displaySize}" Display
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {smartphone.camera} • {smartphone.battery}
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
          Confronta
        </Button>
      </CardActions>
    </Card>
  );
}

export default memo(
  SmartphoneCard,
  (prevProps, nextProps) => prevProps.smartphone.id === nextProps.smartphone.id
);

// Decide quando i props sono uguali
