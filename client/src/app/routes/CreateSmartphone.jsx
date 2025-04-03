import { Box, Typography, Breadcrumbs, Button, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router";
import { Home as HomeIcon } from "@mui/icons-material";
import { useCreateSmartphoneMutation } from "../../lib/redux/services/smartphonesApi";
import SmartphoneForm from "../../components/SmartphoneForm";

export default function CreateSmartphone() {
  const navigate = useNavigate();

  const [createSmartphone, { isLoading, isError, error }] =
    useCreateSmartphoneMutation();

  async function handleSubmit(data) {
    try {
      await createSmartphone(data).unwrap();
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
        <Typography color="text.primary">Crea Smartphone</Typography>
      </Breadcrumbs>

      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        Crea Nuovo Smartphone
      </Typography>

      {isError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Errore nella creazione dello smartphone:{" "}
          {error?.data?.message || "Unknown error occurred"}
        </Alert>
      )}

      <SmartphoneForm onSubmitSuccess={handleSubmit} isLoading={isLoading} />
    </Box>
  );
}
