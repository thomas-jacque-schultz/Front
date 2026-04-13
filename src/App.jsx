import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import MemoryIcon from "@mui/icons-material/Memory";

const TEMP_ADMIN_PASSWORD = "pi31415927";

const fakeServers = [
  { name: "Minecraft - HolyCube", status: "online" },
  { name: "Palworld - Miam", status: "offline" },
  { name: "Satisfactory", status: "online" },
];

function App() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const onlineCount = useMemo(
    () => fakeServers.filter((server) => server.status === "online").length,
    [],
  );

  const onLogin = (event) => {
    event.preventDefault();
    if (password === TEMP_ADMIN_PASSWORD) {
      setLoggedIn(true);
      setError("");
      return;
    }
    setError("Mot de passe invalide");
  };

  if (!loggedIn) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          background:
            "radial-gradient(circle at 20% 30%, #0d47a1 0%, transparent 40%), radial-gradient(circle at 80% 70%, #1b5e20 0%, transparent 35%), #071019",
          py: 3,
        }}
      >
        <Container maxWidth="sm">
          <Card sx={{ borderRadius: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={3}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <SecurityIcon color="primary" />
                  <Typography variant="h5" fontWeight={700}>
                    Game Server Manager
                  </Typography>
                </Stack>

                <Typography color="text.secondary">
                  Connexion administrateur temporaire.
                </Typography>

                <Box component="form" onSubmit={onLogin}>
                  <Stack spacing={2}>
                    <TextField
                      label="Mot de passe admin"
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      autoFocus
                      fullWidth
                    />

                    {error && <Alert severity="error">{error}</Alert>}

                    <Button type="submit" variant="contained" size="large">
                      Se connecter
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, rgba(7,16,25,1) 0%, rgba(10,22,34,1) 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={3}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
          >
            <Typography variant="h4" color="white" fontWeight={700}>
              Pilotage des serveurs
            </Typography>
            <Chip
              icon={<MemoryIcon />}
              color="success"
              label={`${onlineCount}/${fakeServers.length} serveurs en ligne`}
            />
          </Stack>

          {fakeServers.map((server) => (
            <Card key={server.name} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6">{server.name}</Typography>
                  <Chip
                    label={
                      server.status === "online" ? "En ligne" : "Hors ligne"
                    }
                    color={server.status === "online" ? "success" : "default"}
                  />
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export default App;
