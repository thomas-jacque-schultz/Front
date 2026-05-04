export type ServerStatus = "online" | "offline" | "unknown" | "unreachable";

export type GameServerFormMode = "creation" | "edition" | "visualisation";

export interface DisplayedServer {
  id?: string;
  identifier?: string;
  name: string;
  status: ServerStatus;
  lastStatusCheckAt?: string; // ISO-8601, null = never checked
}

export interface GamingServerDto {
  id?: string;
  identifier?: string;
  portainerStackId?: number;
  name?: string;
  urlConnection?: string;
  gameName?: string;
  playersMax?: number;
  installation?: string;
  version?: string;
  description?: string;
  admins?: string[];
  status?: string;
  lastStatusCheckAt?: string;
}

export interface PublicServerStatusDto {
  name?: string;
  status?: string;
  lastStatusCheckAt?: string;
}

export interface UpsertGamingServerPayload {
  identifier: string;
  portainerStackId?: number;
  name: string;
  urlConnection?: string;
  gameName?: string;
  playersMax?: number;
  installation?: string;
  version?: string;
  description?: string;
  admins: string[];
}
