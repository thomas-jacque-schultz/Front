import { useEffect, useMemo, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type {
  DiscordChannelSelection,
  DiscordGuildChannelsDto,
} from "../types/discord";

interface DiscordChannelsCardProps {
  guilds: DiscordGuildChannelsDto[];
  isLoading: boolean;
  error: string;
  onSubmitSelection: (selection: DiscordChannelSelection[]) => Promise<void>;
}

const channelKey = (guildId: string, channelId: string) => `${guildId}:${channelId}`;

function DiscordChannelsCard({
  guilds,
  isLoading,
  error,
  onSubmitSelection,
}: DiscordChannelsCardProps) {
  const [selected, setSelected] = useState<Record<string, DiscordChannelSelection>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [channelsExpanded, setChannelsExpanded] = useState<boolean>(false);

  useEffect(() => {
    const next: Record<string, DiscordChannelSelection> = {};

    guilds.forEach((guild) => {
      guild.channels
        .filter((channel) => channel.subscribed)
        .forEach((channel) => {
          const key = channelKey(guild.guildId, channel.id);
          next[key] = {
            guildId: guild.guildId,
            channelId: channel.id,
            channelName: channel.name,
          };
        });
    });

    setSelected(next);
  }, [guilds]);

  const effectiveSelection = useMemo(() => Object.values(selected), [selected]);

  const onToggleChannel = (
    guildId: string,
    channelId: string,
    channelName: string,
    checked: boolean,
  ) => {
    const key = channelKey(guildId, channelId);
    setSubmitError("");
    setSuccessMessage("");

    setSelected((previous) => {
      if (checked) {
        return {
          ...previous,
          [key]: { guildId, channelId, channelName },
        };
      }

      const next = { ...previous };
      delete next[key];
      return next;
    });
  };

  const isChecked = (guildId: string, channelId: string): boolean => {
    const key = channelKey(guildId, channelId);
    return Boolean(selected[key]);
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");
    setSuccessMessage("");

    try {
      await onSubmitSelection(effectiveSelection);
      setSuccessMessage("Canaux de statut mis a jour et notifications poussees.");
    } catch (submitException) {
      setSubmitError(
        submitException instanceof Error
          ? submitException.message
          : "Impossible de sauvegarder la selection",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={1}
          >
            <Typography variant="h6">Canaux Discord de statut</Typography>
            <Chip
              size="small"
              color="primary"
              label={`${effectiveSelection.length} selection(s)`}
            />
          </Stack>

          <Typography variant="body2" color="text.secondary">
            Selectionne les canaux par serveur Discord. En validant, le bot applique la meme logique
            que la commande /subscribe et met a jour les messages d'etat.
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}
          {submitError && <Alert severity="error">{submitError}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}

          <Accordion
            disableGutters
            expanded={channelsExpanded}
            onChange={(_, expanded) => setChannelsExpanded(expanded)}
            sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider", borderRadius: "10px" }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1" fontWeight={600}>
                Liste des canaux Discord ({guilds.length} serveur(s))
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {isLoading ? (
                <Box sx={{ py: 2, display: "flex", justifyContent: "center" }}>
                  <CircularProgress size={26} />
                </Box>
              ) : (
                <Stack spacing={2}>
                  {guilds.map((guild) => (
                    <Box key={guild.guildId}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {guild.guildName}
                      </Typography>
                      <Stack sx={{ mt: 1 }}>
                        {guild.channels.map((channel) => (
                          <FormControlLabel
                            key={channel.id}
                            control={
                              <Checkbox
                                checked={isChecked(
                                  guild.guildId,
                                  channel.id,
                                )}
                                onChange={(event) =>
                                  onToggleChannel(
                                    guild.guildId,
                                    channel.id,
                                    channel.name,
                                    event.target.checked,
                                  )
                                }
                              />
                            }
                            label={`#${channel.name}`}
                          />
                        ))}
                      </Stack>
                      <Divider sx={{ mt: 1 }} />
                    </Box>
                  ))}
                </Stack>
              )}
            </AccordionDetails>
          </Accordion>

          <Stack direction="row" justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={onSubmit}
              disabled={isSubmitting || isLoading || effectiveSelection.length === 0}
            >
              Valider la selection
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default DiscordChannelsCard;
