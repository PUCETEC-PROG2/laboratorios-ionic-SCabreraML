import axios from "axios";
import { Repository } from "../interfaces/Repository";
import { GithubUser } from "../interfaces/GithubUser";
import { RepositoryPayload } from "../interfaces/RepositoryPayload";

const GITHUB_API_URL = "https://api.github.com/user/repos";
const GITHUB_USER_URL = "https://api.github.com/user";
const GITHUB_API_TOKEN = "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";

const apiClient = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Bearer ${GITHUB_API_TOKEN}`,
    Accept: "application/vnd.github+json",
  },
});

/* =========================
   REPOSITORIOS
========================= */

export const fetchRepositories = async (): Promise<Repository[]> => {
  try {
    const response = await apiClient.get("/user/repos", {
      params: {
        per_page: 100,
        sort: "created",
        direction: "desc",
        affiliation: "owner",
      },
    });

    return response.data.map((repo: any) => ({
      name: repo.name,
      description: repo.description ?? "Sin descripción",
      language: repo.language ?? "No especificado",
      avatarUrl: repo.owner.avatar_url,
      _owner: repo.owner
    }));
  } catch (error) {
    console.error("GitHub API Error (repos):", error);
    throw new Error("Error al obtener repositorios");
  }
};
/**REPOSItorio crear */
export const createRepository = async (
  repository: RepositoryPayload
): Promise<Repository | null> => {
  try {
    const response = await apiClient.post("/user/repos", {
      name: repository.name,
      description: repository.description,
    });

    return {
      name: response.data.name,
      description: response.data.description ?? "Sin descripción",
      language: response.data.language ?? "No especificado",
      avatarUrl: response.data.owner.avatar_url,
    };
  } catch (error) {
    throw new Error("Error al crear repositorio");
  }
};

/* =========================
   USUARIO
========================= */

export const fetchUserInfo = async (): Promise<GithubUser> => {
  try {
    const response = await apiClient.get("/user");

    return {
      id: response.data.id,
      login: response.data.login,
      name: response.data.name,
      avatar_url: response.data.avatar_url,
      bio: response.data.bio,
    };
  } catch (error) {
    console.error("GitHub API Error (user):", error);
    throw new Error("Error al obtener información del usuario");
  }
};

export const updateRepository = async (
  owner: string,
  repo: string,
  repository: RepositoryPayload
): Promise<Repository> => {
  try {
    const response = await apiClient.patch(`/repos/${owner}/${repo}`, {
      name: repository.name,
      description: repository.description,
    });

    return {
      name: response.data.name,
      description: response.data.description ?? "Sin descripción",
      language: response.data.language ?? "No especificado",
      avatarUrl: response.data.owner.avatar_url,
    };
  } catch (error) {
    console.error("GitHub API Error (update repo):", error);
    throw new Error("Error al actualizar el repositorio");
  }
};


export const deleteRepository = async (
  owner: string,
  repo: string
): Promise<void> => {
  try {
    await apiClient.delete(`/repos/${owner}/${repo}`);
  } catch (error) {
    console.error("GitHub API Error (delete repo):", error);
    throw new Error("Error al eliminar el repositorio");
  }
};