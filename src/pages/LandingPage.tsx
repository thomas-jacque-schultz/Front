import { useEffect, useCallback } from "react";
import { Box, Button, Card, CardContent, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ServersDashboard from "../components/AllServersComponent";
import { useAuthStore } from "../stores/authStore";
import { useServersStore } from "../stores/serversStore";

const REFRESH_INTERVAL_MS = 30_000;

function LandingPage() {
  const navigate = useNavigate();
  const { connected } = useAuthStore();
  const { servers, isLoading, error, lastRefreshedAt, loadPublicServers } = useServersStore();

  const refresh = useCallback(() => {
    void loadPublicServers();
  }, [loadPublicServers]);

  useEffect(() => {
    void loadPublicServers();
    const interval = setInterval(refresh, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [loadPublicServers, refresh]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background:
          "radial-gradient(circle at 15% 25%, #0d47a1 0%, transparent 35%), radial-gradient(circle at 85% 75%, #004d40 0%, transparent 40%), #071019",
        py: 3,
        position: "relative",
      }}
    >
      {!connected && (
        <Box sx={{ position: "absolute", top: 24, right: 24 }}>
          <Button variant="contained" size="large" onClick={() => navigate("/login")}>
            Connexion
          </Button>
        </Box>
      )}

      <Container maxWidth="md">
        <Card>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Stack spacing={3}>
              <Typography variant="overline" color="primary" fontWeight={700}>
                SCHUB BOT FRONT
              </Typography>
              <Typography variant="h3" fontWeight={800}>
                Pilote tes serveurs de jeu
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 700 }}>
                Interface web pour superviser tes instances, suivre leur statut et lancer les actions bot depuis un point d'acces unique.
              </Typography>

              <ServersDashboard
                servers={servers}
                isLoading={isLoading}
                error={error}
                connected
                lastRefreshedAt={lastRefreshedAt}
                onRefresh={refresh}
              />
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default LandingPage;
