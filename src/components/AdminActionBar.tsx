import { Button, Card, CardContent, Stack, Typography } from "@mui/material";

interface AdminActionBarProps {
  onCreateServer: () => void;
}

function AdminActionBar({ onCreateServer }: AdminActionBarProps) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
        >
          <Stack spacing={0.5}>
            <Typography variant="h6" fontWeight={700}>
              Actions administrateur
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Gere les fiches serveurs affichees aux joueurs et dans les messages Discord.
            </Typography>
          </Stack>
          <Button variant="contained" size="large" onClick={onCreateServer}>
            Ajouter un nouveau serveur
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default AdminActionBar;
