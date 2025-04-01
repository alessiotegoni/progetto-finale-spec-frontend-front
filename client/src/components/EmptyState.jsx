import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router";

const EmptyState = ({
  title = "No items found",
  description = "There are no items to display.",
  icon,
  actionText,
  actionLink,
  onActionClick,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        px: 2,
        textAlign: "center",
      }}
    >
      {icon && <Box sx={{ mb: 3, color: "text.secondary" }}>{icon}</Box>}

      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4, maxWidth: 500 }}
      >
        {description}
      </Typography>

      {actionText && (actionLink || onActionClick) && (
        <Button
          variant="contained"
          color="primary"
          component={actionLink ? Link : "button"}
          to={actionLink}
          onClick={onActionClick}
        >
          {actionText}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
