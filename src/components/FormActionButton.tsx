import { Box, Button } from "@mui/material";
import type { GameServerFormMode } from "../types/server";

interface FormActionButtonProps {
  mode: GameServerFormMode;
  isSubmitting?: boolean;
  onBack?: () => void;
}

function FormActionButton({ mode, isSubmitting = false, onBack }: FormActionButtonProps) {
  const label =
    mode === "creation" ? "Creer" : mode === "edition" ? "Sauvegarder" : "Retour";

  const type = mode === "visualisation" ? "button" : "submit";
  const variant = mode === "visualisation" ? "outlined" : "contained";

  return (
    <Box sx={{ position: "fixed", right: 24, bottom: 24, zIndex: 1300 }}>
      <Button
        type={type}
        variant={variant}
        size="large"
        disabled={isSubmitting}
        onClick={mode === "visualisation" ? onBack : undefined}
      >
        {label}
      </Button>
    </Box>
  );
}

export default FormActionButton;
