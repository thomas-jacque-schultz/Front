import { useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminActionBar from "../components/AdminActionBar";
import ServersDashboard from "../components/AllServersComponent";
import { useAuthStore } from "../stores/authStore";
import { useServersStore } from "../stores/serversStore";

const REFRESH_INTERVAL_MS = 30_000;

function DashboardPage() {
  const navigate = useNavigate();
  const { accessToken, profile, isAdmin, logout } = useAuthStore();
  const { servers, isLoading, error: serversError, lastRefreshedAt, loadServers, resetServers } =
    useServersStore();

  const refresh = useCallback(() => {
    if (accessToken && profile) void loadServers(accessToken);
  }, [accessToken, profile, loadServers]);

  useEffect(() => {
    if (!accessToken || !profile) {
      resetServers();
      return;
    }
    void loadServers(accessToken);
    const interval = setInterval(refresh, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [accessToken, profile, loadServers, resetServers, refresh]);

  const onLogout = () => {
    resetServers();
    logout();
    navigate("/", { replace: true });
  };

  const onViewServer = (serverId: string) => {
    navigate(`/gameServeur/${serverId}/view`);
  };

  const onEditServer = (serverId: string) => {
    navigate(`/gameServeur/${serverId}/edit`);
  };

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
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip color="primary" label={`Connecte: ${profile?.username ?? "-"}`} />
              <Button variant="outlined" color="inherit" onClick={onLogout}>
                Deconnexion
              </Button>
            </Stack>
          </Stack>

          {isAdmin && (
            <AdminActionBar onCreateServer={() => navigate("/gameServeur/create")} />
          )}

          <ServersDashboard
            servers={servers}
            isLoading={isLoading}
            error={serversError}
            connected={Boolean(accessToken && profile)}
            canEdit={isAdmin}
            lastRefreshedAt={lastRefreshedAt}
            onRefresh={refresh}
            onViewServer={onViewServer}
            onEditServer={onEditServer}
          />
        </Stack>
      </Container>
    </Box>
  );
}

export default DashboardPage;
