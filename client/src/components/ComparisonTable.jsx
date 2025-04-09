import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Smartphone as SmartphoneIcon,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import {
  clearComparison,
  removeFromComparison,
} from "../lib/redux/slices/comparisonSlice";

export const specs = [
  { key: "brand", label: "Marca" },
  { key: "os", label: "Sistema Operativo" },
  {
    key: "displaySize",
    label: "Dimensione Display",
    format: (value) => `${value}"`,
  },
  { key: "camera", label: "Fotocamera" },
  { key: "battery", label: "Batteria" },
  { key: "description", label: "Descrizione" },
  {
    key: "createdAt",
    label: "Data di Rilascio",
    format: (value) => new Date(value).toLocaleDateString(),
  },
];

export default function ComparisonTable({ items }) {
  const dispatch = useDispatch();

  if (!items?.length) return null;

  const handleRemoveItem = (id) => {
    dispatch(removeFromComparison(id));
  };

  const handleClearComparison = () => {
    dispatch(clearComparison());
  };

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        width: "100%",
        maxWidth: "100%",
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h6">Confronto</Typography>
        <Box>
          <Button
            component={Link}
            to="/"
            startIcon={<ArrowBackIcon />}
            sx={{ mr: 1 }}
          >
            Indietro
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleClearComparison}
          >
            Pulisci
          </Button>
        </Box>
      </Box>

      <TableContainer
        sx={{
          overflowX: "auto",
          overflowY: "hidden",
          maxWidth: "100%",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", width: "150px" }}>
                Caratteristiche
              </TableCell>
              {items.map((item) => (
                <TableCell
                  key={item.id}
                  align="center"
                  sx={{ position: "relative", minWidth: "200px" }}
                >
                  <IconButton
                    size="small"
                    sx={{ position: "absolute", top: 8, right: 8 }}
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    {item.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 100,
                      mb: 1,
                    }}
                  >
                    <SmartphoneIcon
                      sx={{ fontSize: 60, color: "text.secondary" }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    ${item.price}
                  </Typography>
                </TableCell>
              ))}
              {items.length === 1 && (
                <TableCell align="center" sx={{ minWidth: "200px" }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontStyle: "italic" }}
                  >
                    Aggiungi un altro dispositivo per confrontare
                  </Typography>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Categoria</TableCell>
              {items.map((item) => (
                <TableCell key={`${item.id}-category`} align="center">
                  {item.category}
                </TableCell>
              ))}
              {items.length === 1 && <TableCell />}
            </TableRow>

            {specs.map((spec) => (
              <TableRow key={spec.key}>
                <TableCell sx={{ fontWeight: "bold" }}>{spec.label}</TableCell>
                {items.map((item) => (
                  <TableCell key={`${item.id}-${spec.key}`} align="center">
                    {spec.format?.(item[spec.key]) ?? item[spec.key]}
                  </TableCell>
                ))}
                {items.length === 1 && <TableCell />}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
