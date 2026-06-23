import React from "react";
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";

import "./Tab1.css";

import RepoItem from "../components/RepoItem";
import LoadingSpinner from "../components/LoadingSpinner";

import { Repository } from "../interfaces/Repository";
import { fetchRepositories } from "../services/GithubServices";

const Tab1: React.FC = () => {
  const [repositoryList, setRepositoryList] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {loading && <LoadingSpinner />}

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {repositoryList.map((repo) => (
            <RepoItem
              key={repo.name}
              name={repo.name}
              description={repo.description}
              language={repo.language}
              avatarUrl={repo.avatarUrl}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;