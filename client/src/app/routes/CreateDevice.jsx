import { Box, Typography, Breadcrumbs, Button, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router";
import { Home as HomeIcon } from "@mui/icons-material";
import { useCreateDeviceMutation } from "../../lib/redux/services/devicesApi";
import DeviceForm from "../../components/DeviceForm";

export default function CreateDevice() {
  const navigate = useNavigate();

  const [createDevice, { isLoading, isError, error }] =
    useCreateDeviceMutation();

  async function handleSubmit(data) {
    try {
      await createDevice(data).unwrap();
      // unwrap lancia un errore se presente, se non presente ritorna i dati
      navigate("/");
    } catch (err) {
      console.error("Failed to create smartphone:", err);
    }
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
        <Typography color="text.primary">Crea dispositivo</Typography>
      </Breadcrumbs>

      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        Crea Nuovo Dispositivo
      </Typography>

      {isError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Errore nella creazione dello smartphone:{" "}
          {error?.data?.message || "Unknown error occurred"}
        </Alert>
      )}

      <DeviceForm onSubmitSuccess={handleSubmit} isLoading={isLoading} />
    </Box>
  );
}
