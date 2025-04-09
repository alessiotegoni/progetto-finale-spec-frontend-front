import { Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { CompareArrows as CompareIcon } from "@mui/icons-material";
import EmptyState from "../../components/EmptyState";
import ComparisonTable from "../../components/ComparisonTable";

const Comparison = () => {
  const comparisonItems = useSelector((state) => state.comparison.items);

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
          Confronta Dispositivi
        </Typography>

        {comparisonItems.length ? (
          <ComparisonTable items={comparisonItems} />
        ) : (
          <EmptyState
            title="Nessuno dispositivo da confrontare"
            description="Aggiungi i dispositivi al confronto per vedere le loro specifiche affiancate."
            icon={<CompareIcon sx={{ fontSize: 60 }} />}
            actionText="Cerca dispositivi"
            actionLink="/"
          />
        )}
      </Box>
    </>
  );
};

export default Comparison;
