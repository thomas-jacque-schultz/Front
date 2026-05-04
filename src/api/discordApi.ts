import { requestJson } from "./httpClient";
import type {
  DiscordChannelSelection,
  DiscordGuildChannelsDto,
} from "../types/discord";

export const getDiscordGuildChannelsApi = async (
  token: string,
): Promise<DiscordGuildChannelsDto[]> => {
  return requestJson<DiscordGuildChannelsDto[]>("/bot/discord/guilds/channels", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const subscribeDiscordChannelsApi = async (
  token: string,
  channels: DiscordChannelSelection[],
): Promise<void> => {
  await requestJson<void>("/bot/gaming-server/subscribe-channels", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ channels }),
  });
};
