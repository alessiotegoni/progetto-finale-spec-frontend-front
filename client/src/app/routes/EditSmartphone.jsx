import {
  Box,
  Typography,
  Breadcrumbs,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router";
import { Home as HomeIcon } from "@mui/icons-material";
import {
  useGetSmartphoneByIdQuery,
  useUpdateSmartphoneMutation,
} from "../../lib/redux/services/smartphonesApi";
import SmartphoneForm from "../../components/SmartphoneForm";

const EditSmartphone = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: smartphone,
    isLoading: isLoadingSmartphone,
    isError: isErrorFetching,
  } = useGetSmartphoneByIdQuery(id);
  const [
    updateSmartphone,
    { isLoading: isUpdating, isError: isErrorUpdating, error },
  ] = useUpdateSmartphoneMutation();

  const handleSubmit = async (data) => {
    try {
      await updateSmartphone({ id, ...data }).unwrap();
      navigate(`/details/${id}`);
    } catch (err) {
      console.error("Failed to update smartphone:", err);
    }
  };

  if (isLoadingSmartphone) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isErrorFetching || !smartphone) {
    return (
      <Alert severity="error" sx={{ mb: 4 }}>
        Errore nel caricamento dei Dettagli dello smartphone. Perfavore prova
        piu tardi
      </Alert>
    );
  }

  return (
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
        <Button
          component={Link}
          to={`/details/${id}`}
          size="small"
          color="inherit"
        >
          {smartphone.title}
        </Button>
        <Typography color="text.primary">Modifica</Typography>
      </Breadcrumbs>

      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        Modifica Smartphone
      </Typography>

      {isErrorUpdating && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Errore nell'aggiornamento dello smartphone:{" "}
          {error?.data?.message || "Unknown error occurred"}
        </Alert>
      )}

      <SmartphoneForm
        smartphone={smartphone}
        onSubmitSuccess={handleSubmit}
        isLoading={isUpdating}
      />
    </Box>
  );
};

export default EditSmartphone;
