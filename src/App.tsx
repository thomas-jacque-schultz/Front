import { type ReactNode } from "react";
import { Box, Card, CardContent, Container, LinearProgress, Stack, Typography } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/Dashboard";
import GameServerFormPage from "./pages/GameServerFormPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Login";
import { useAuthStore } from "./stores/authStore";

interface GuardProps {
  children: ReactNode;
}

function RequireAuth({ children }: GuardProps) {
  const { connected } = useAuthStore();
  return connected ? <>{children}</> : <Navigate to="/login" replace />;
}

function RequireAdmin({ children }: GuardProps) {
  const { connected, isAdmin } = useAuthStore();
  if (!connected) {
    return <Navigate to="/login" replace />;
  }

  return isAdmin ? <>{children}</> : <Navigate to="/dashboard" replace />;
}

function RedirectIfAuthenticated({ children }: GuardProps) {
  const { connected } = useAuthStore();
  return connected ? <Navigate to="/dashboard" replace /> : <>{children}</>;
}

function App() {
  const { isCheckingSession } = useAuthStore();

  if (isCheckingSession) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 20% 30%, #0d47a1 0%, transparent 40%), radial-gradient(circle at 80% 70%, #1b5e20 0%, transparent 35%), #071019",
        }}
      >
        <Container maxWidth="sm">
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={2}>
                <Typography variant="h6">Validation de session...</Typography>
                <LinearProgress />
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={
          <RedirectIfAuthenticated>
            <LoginPage />
          </RedirectIfAuthenticated>
        }
      />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        }
      />
      <Route
        path="/gameServeur/create"
        element={
          <RequireAdmin>
            <GameServerFormPage />
          </RequireAdmin>
        }
      />
      <Route
        path="/gameServeur/:id/edit"
        element={
          <RequireAdmin>
            <GameServerFormPage />
          </RequireAdmin>
        }
      />
      <Route
        path="/gameServeur/:id/view"
        element={
          <RequireAuth>
            <GameServerFormPage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
