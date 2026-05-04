import { ApiError, requestJson } from "./httpClient";
import type {
  DisplayedServer,
  GamingServerDto,
  PublicServerStatusDto,
  ServerStatus,
  UpsertGamingServerPayload,
} from "../types/server";

const fallbackServers: DisplayedServer[] = [
  { name: "Minecraft - HolyCube", status: "online" },
  { name: "Palworld - Miam", status: "offline" },
  { name: "Satisfactory", status: "online" },
];

const normalizeStatus = (rawStatus?: string): ServerStatus => {
  if (!rawStatus) {
    return "unknown";
  }

  const normalized = rawStatus.toLowerCase();
  if (normalized.includes("up") || normalized.includes("running") || normalized.includes("online")) {
    return "online";
  }
  if (normalized.includes("down") || normalized.includes("stopped") || normalized.includes("offline")) {
    return "offline";
  }
  if (normalized.includes("unreachable")) {
    return "unreachable";
  }

  return "unknown";
};

const toDisplayedServer = (server: GamingServerDto): DisplayedServer => ({
  id: server.id,
  identifier: server.identifier,
  name: server.name || server.identifier || "Serveur inconnu",
  status: normalizeStatus(server.status),
  lastStatusCheckAt: server.lastStatusCheckAt,
});

const toPublicDisplayedServer = (server: PublicServerStatusDto): DisplayedServer => ({
  name: server.name || "Serveur inconnu",
  status: normalizeStatus(server.status),
  lastStatusCheckAt: server.lastStatusCheckAt,
});

export const getGamingServersApi = async (token?: string): Promise<GamingServerDto[]> => {
  return requestJson<GamingServerDto[]>("/bot/gaming-server", {
    method: "GET",
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : undefined,
  });
};

export const getGamingServerByIdApi = async (
  token: string,
  id: string,
): Promise<GamingServerDto | null> => {
  const servers = await getGamingServersApi(token);
  return servers.find((server) => server.id === id || server.identifier === id) || null;
};

export const createGamingServerApi = async (
  token: string,
  payload: UpsertGamingServerPayload,
): Promise<GamingServerDto> => {
  return requestJson<GamingServerDto>("/bot/gaming-server", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};

export const updateGamingServerApi = async (
  token: string,
  id: string,
  payload: UpsertGamingServerPayload,
): Promise<GamingServerDto> => {
  return requestJson<GamingServerDto>(`/bot/gaming-server/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};

export const getDisplayedServersApi = async (
  token?: string,
): Promise<DisplayedServer[]> => {
  try {
    const response = await getGamingServersApi(token);

    return response.map(toDisplayedServer);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return fallbackServers;
    }

    throw error;
  }
};

export const getPublicDisplayedServersApi = async (): Promise<DisplayedServer[]> => {
  try {
    const response = await requestJson<PublicServerStatusDto[]>("/bot/gaming-server/public-status", {
      method: "GET",
    });

    return response.map(toPublicDisplayedServer);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return fallbackServers;
    }

    throw error;
  }
};

export const startGamingServerApi = async (
  token: string,
  identifier: string,
): Promise<void> => {
  await requestJson<{ status: string; message: string }>("/bot/gaming-server/command/start", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(identifier),
  });
};

export const stopGamingServerApi = async (
  token: string,
  identifier: string,
): Promise<void> => {
  await requestJson<{ status: string; message: string }>("/bot/gaming-server/command/pause", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(identifier),
  });
};
