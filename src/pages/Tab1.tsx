import React, { useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  useIonAlert,
} from "@ionic/react";

import "./Tab1.css";

import RepoItem from "../components/RepoItem";
import LoadingSpinner from "../components/LoadingSpinner";

import { Repository } from "../interfaces/Repository";
import {
  fetchRepositories,
  updateRepository,
  deleteRepository,
} from "../services/GithubServices";

const Tab1: React.FC = () => {
  const [repositoryList, setRepositoryList] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const [presentAlert] = useIonAlert();

  const loadRepositories = async () => {
    setLoading(true);
    try {
      const repos = await fetchRepositories();
      setRepositoryList(repos);
    } catch (error) {
      console.error("Error al cargar repositorios:", error);
    } finally {
      setLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    loadRepositories();
  });

  useEffect(() => {
    const handler = () => {
      loadRepositories();
    };

    window.addEventListener("repo-created", handler);

    return () => {
      window.removeEventListener("repo-created", handler);
    };
  }, []);

  /* =========================
     PATCH (UPDATE)
  ========================= */
  const handleEdit = async (repo: Repository) => {
    presentAlert({
      header: "Editar repositorio",
      inputs: [
        {
          name: "name",
          type: "text",
          placeholder: "Nombre",
          value: repo.name,
        },
        {
          name: "description",
          type: "text",
          placeholder: "Descripción",
          value: repo.description,
        },
      ],
      buttons: [
        "Cancelar",
        {
          text: "Actualizar",
          handler: async (data) => {
            try {
              // CORRECCIÓN: Extraemos el string 'login' desde el objeto _owner
              const ownerName = (repo as any)._owner?.login;

              if (!ownerName) {
                console.error("No se pudo obtener el nombre del propietario");
                return;
              }

              const updated = await updateRepository(ownerName, repo.name, {
                name: data.name,
                description: data.description,
              });

              // Conservamos la referencia de _owner para que no se rompan futuras ediciones/borrados
              const updatedWithMetadata = {
                ...updated,
                _owner: (repo as any)._owner,
              };

              setRepositoryList((prev) =>
                prev.map((r) => (r.name === repo.name ? updatedWithMetadata : r))
              );
            } catch (error) {
              console.error("Error actualizando repo:", error);
            }
          },
        },
      ],
    });
  };

  /* =========================
     DELETE
  ========================= */
  const handleDelete = async (repo: Repository) => {
    presentAlert({
      header: "Eliminar repositorio",
      message: `¿Seguro que quieres eliminar ${repo.name}?`,
      buttons: [
        "Cancelar",
        {
          text: "Eliminar",
          role: "destructive",
          handler: async () => {
            try {
              // CORRECCIÓN: Extraemos el string 'login' desde el objeto _owner
              const ownerName = (repo as any)._owner?.login;

              if (!ownerName) {
                console.error("No se pudo obtener el nombre del propietario");
                return;
              }

              await deleteRepository(ownerName, repo.name);

              setRepositoryList((prev) =>
                prev.filter((r) => r.name !== repo.name)
              );
            } catch (error) {
              console.error("Error eliminando repo:", error);
            }
          },
        },
      ],
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {loading && <LoadingSpinner />}

        <IonList>
          {repositoryList.map((repo) => (
            <RepoItem
              key={repo.name}
              {...repo}
              onEdit={() => handleEdit(repo)}
              onDelete={() => handleDelete(repo)}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;