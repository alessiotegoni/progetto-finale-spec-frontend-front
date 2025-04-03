import { useParams, Link, useNavigate } from "react-router";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  IconButton,
  Breadcrumbs,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  CompareArrows as CompareIcon,
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon,
  Smartphone as SmartphoneIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteSmartphoneMutation,
  useGetSmartphoneByIdQuery,
} from "../../lib/redux/services/smartphonesApi";
import {
  addFavorite,
  removeFavorite,
} from "../../lib/redux/slices/favoritesSlice";
import { specs } from "../../components/ComparisonTable";
import { addToComparison } from "../../lib/redux/slices/comparisonSlice";
import { useState } from "react";

export default function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const {
    data: smartphone,
    isLoading,
    isError,
  } = useGetSmartphoneByIdQuery(id);
  const [deleteSmartphone, { isLoading: isDeleting }] =
    useDeleteSmartphoneMutation();

  const favorites = useSelector((state) => state.favorites.items);
  const comparisonItems = useSelector((state) => state.comparison.items);

  const isFavorite =
    smartphone && favorites.some((item) => item.id === smartphone.id);
  const isInComparison =
    smartphone && comparisonItems.some((item) => item.id === smartphone.id);
  const isComparisonFull = comparisonItems.length >= 2;

  const handleToggleFavorite = () =>
    isFavorite
      ? dispatch(removeFavorite(smartphone.id))
      : dispatch(addFavorite(smartphone));

  const handleAddToComparison = () =>
    !isInComparison &&
    !isComparisonFull &&
    dispatch(addToComparison(smartphone));

  const handleDeleteConfirm = async () => {
    try {
      await deleteSmartphone(id).unwrap();
      setDeleteDialogOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete smartphone:", error);
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteCancel = () => setDeleteDialogOpen(false);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !smartphone) {
    return (
      <Alert severity="error" sx={{ mb: 4 }}>
        Errore nel caricamento dello smartphone
      </Alert>
    );
  }

  return (
    <>
      <title>Smartphone {smartphone?.title ?? "non trovato"}</title>
      <Box>
        <Breadcrumbs sx={{ mb: 3 }}>
          <Button
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
            size="small"
            color="inherit"
          >
            Home
          </Button>
          <Typography color="text.primary">{smartphone.title}</Typography>
        </Breadcrumbs>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            border: "1px solid",
            borderColor: "divider",
            overflow: "hidden",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f5f5f5",
                  borderRadius: 2,
                  p: 4,
                  height: 300,
                }}
              >
                <SmartphoneIcon
                  sx={{ fontSize: 120, color: "text.secondary" }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box>
                  <Chip label={smartphone.os} size="small" sx={{ mb: 1 }} />
                  <Typography variant="h4" component="h1" gutterBottom>
                    {smartphone.title}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    onClick={handleToggleFavorite}
                    color={isFavorite ? "secondary" : "default"}
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>

                  <IconButton
                    component={Link}
                    to={`/edit/${smartphone.id}`}
                    color="primary"
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => setDeleteDialogOpen(true)}
                    color="error"
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>

              <Typography variant="h5" color="primary" sx={{ mb: 3 }}>
                ${smartphone.price}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Specifications
              </Typography>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                {specs.map(({ key, label, format }) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {label}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {format ? format(smartphone[key]) : smartphone[key]}
                    </Typography>
                  </Grid>
                ))}
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  gap: 2,
                  mt: 4,
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  component={Link}
                  to="/"
                  sx={{
                    flexGrow: 1,
                    minWidth: 180,
                    maxWidth: { xs: "none", sm: 200 },
                  }}
                >
                  Back to List
                </Button>

                <Button
                  variant={isInComparison ? "contained" : "outlined"}
                  color="primary"
                  startIcon={<CompareIcon />}
                  onClick={handleAddToComparison}
                  disabled={isComparisonFull && !isInComparison}
                  sx={{
                    flexGrow: 1,
                    minWidth: 180,
                    maxWidth: { xs: "none", sm: 200 },
                  }}
                >
                  {isInComparison ? "Added to Comparison" : "Add to Comparison"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
          <DialogTitle>Delete Smartphone</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Sei sicuro di voler eliminare lo smartphone "{smartphone.title}"?
              Questa azione e' irreversibile
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} disabled={isDeleting}>
              Chiudi
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              color="error"
              disabled={isDeleting}
            >
              {isDeleting ? "Eliminando..." : "Elimina"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
