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
  useGetDeviceByIdQuery,
  useUpdateDeviceMutation,
} from "../../lib/redux/services/devicesApi";
import DeviceForm from "../../components/DeviceForm";

const EditDevice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: device,
    isLoading: isLoadingDevice,
    isError: isErrorFetching,
  } = useGetDeviceByIdQuery(id);
  const [
    updateDevice,
    { isLoading: isUpdating, isError: isErrorUpdating, error },
  ] = useUpdateDeviceMutation();

  const handleSubmit = async (data) => {
    try {
      await updateDevice({ id, ...data }).unwrap();
      navigate(`/details/${id}`);
    } catch (err) {
      console.error("Failed to update device:", err);
    }
  };

  if (isLoadingDevice) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isErrorFetching || !device) {
    return (
      <Alert severity="error" sx={{ mb: 4 }}>
        Errore nel caricamento dei Dettagli dello device. Perfavore prova
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
          {device.title}
        </Button>
        <Typography color="text.primary">Modifica</Typography>
      </Breadcrumbs>

      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        Modifica Dispositivo
      </Typography>

      {isErrorUpdating && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Errore nell'aggiornamento dell dispositivo:{" "}
          {error?.data?.message || "Unknown error occurred"}
        </Alert>
      )}

      <DeviceForm
        device={device}
        onSubmitSuccess={handleSubmit}
        isLoading={isUpdating}
      />
    </Box>
  );
};

export default EditDevice;
