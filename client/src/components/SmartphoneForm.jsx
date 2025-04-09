import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
  Paper,
  Divider,
  InputAdornment,
} from "@mui/material";
import { Save as SaveIcon, Cancel as CancelIcon } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";

const SmartphoneForm = ({ smartphone, onSubmitSuccess, isLoading }) => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      title: smartphone?.title || "",
      category: smartphone?.category || "Smartphone",
      brand: smartphone?.brand || "",
      os: smartphone?.os || "",
      displaySize: smartphone?.displaySize?.toString() || "",
      price: smartphone?.price?.toString() || "",
      description: smartphone?.description || "",
      camera: smartphone?.camera || "",
      battery: smartphone?.battery || "",
    },
  });

  const onSubmit = (data) => {

    if (isSubmitSuccessful) return;
    onSubmitSuccess({
      ...data,
      displaySize: parseFloat(data.displaySize),
      price: parseFloat(data.price),
    });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 3, sm: 5 },
        borderRadius: 3,
        maxWidth: 600,
        mx: "auto",
        my: 4,
        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
        {smartphone ? "Modifica Smartphone" : "Crea Nuovo Smartphone"}
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          {[
            { name: "title", label: "Titolo", type: "text" },
            { name: "brand", label: "Marca", type: "text" },
            {
              name: "os",
              label: "Sistema Operativo",
              type: "select",
              options: ["iOS", "Android", "Altro"],
            },
            {
              name: "displaySize",
              label: "Dimensione Display",
              type: "number",
              adornment: "inches",
              min: 0,
              step: 0.1,
            },
            {
              name: "price",
              label: "Prezzo",
              type: "number",
              adornment: "$",
              min: 0,
            },
            { name: "camera", label: "Fotocamera", type: "text" },
            { name: "battery", label: "Batteria", type: "text" },
          ].map(({ name, label, type, options, adornment, ...props }) => (
            <Grid item xs={12} sm={6} key={name}>
              <Controller
                name={name}
                control={control}
                rules={{ required: `${label} è obbligatorio` }}
                render={({ field }) =>
                  type === "select" ? (
                    <TextField
                      {...field}
                      required
                      select
                      fullWidth
                      sx={{ minWidth: 200 }}
                      label={label}
                      error={!!errors[name]}
                      helperText={errors[name]?.message}
                    >
                      {options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      label={label}
                      type={type}
                      error={!!errors[name]}
                      helperText={errors[name]?.message}
                      InputProps={{
                        startAdornment: adornment ? (
                          <InputAdornment position="start">
                            {adornment}
                          </InputAdornment>
                        ) : null,
                        inputProps: props,
                      }}
                    />
                  )
                }
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              rules={{
                required: "La descrizione è obbligatoria",
                minLength: {
                  value: 10,
                  message: "Inserisci almeno 10 caratteri",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  multiline
                  rows={4}
                  label="Descrizione"
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        {/* BOTTONI */}
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "space-between" },
            mt: 4,
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={() => navigate(-1)}
            sx={{
              flex: 1,
              minWidth: 140,
              borderColor: "grey.400",
              color: "grey.700",
              "&:hover": { borderColor: "grey.600", bgcolor: "grey.100" },
            }}
          >
            Annulla
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={isLoading}
            sx={{
              flex: 1,
              minWidth: 140,
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            {isLoading ? "Salvataggio..." : "Salva"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default SmartphoneForm;
