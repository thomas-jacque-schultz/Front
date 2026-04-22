import { requestJson } from "./httpClient";
import type {
  AuthMeResponse,
  AuthenticatedUser,
  LoginRequest,
  LoginResponse,
} from "../types/auth";

const normalizeRoles = (roles: AuthMeResponse["roles"]): string[] =>
  roles
    .map((role) => {
      if (typeof role === "string") {
        return role;
      }

      if (role && typeof role === "object" && "authority" in role) {
        return String(role.authority);
      }

      return "";
    })
    .filter(Boolean);

export const loginApi = async (payload: LoginRequest): Promise<LoginResponse> =>
  requestJson<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getMeApi = async (token: string): Promise<AuthenticatedUser> => {
  const response = await requestJson<AuthMeResponse>("/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    username: response.username,
    roles: normalizeRoles(response.roles || []),
  };
};
