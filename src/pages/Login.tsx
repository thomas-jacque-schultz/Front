import { Alert, Box, Button, Card, CardContent, Container, Stack, TextField, Typography } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuthStore } from "../stores/authStore";

const loginSchema = z.object({
  username: z.string().min(1, "Le nom d'utilisateur est requis"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginPage() {
  const { isSubmitting, error, login, clearError } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "admin",
      password: "",
    },
  });

  const onLogin = handleSubmit(async (values: LoginFormValues) => {
    clearError();
    await login(values.username, values.password);
    navigate("/dashboard", { replace: true });
  });

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
                  Login administrateur
                </Typography>
              </Stack>

              <Typography color="text.secondary">
                Connexion securisee via JWT.
              </Typography>

              <Box component="form" onSubmit={onLogin}>
                <Stack spacing={2}>
                  <TextField
                    label="Nom d'utilisateur"
                    autoFocus
                    fullWidth
                    {...register("username")}
                    error={Boolean(errors.username)}
                    helperText={errors.username?.message}
                  />

                  <TextField
                    label="Mot de passe"
                    type="password"
                    fullWidth
                    {...register("password")}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                  />

                  {error && <Alert severity="error">{error}</Alert>}

                  <Stack direction="row" spacing={2}>
                    <Button variant="outlined" onClick={() => navigate("/")}>
                      Retour
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={isSubmitting}
                    >
                      Se connecter
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default LoginPage;
