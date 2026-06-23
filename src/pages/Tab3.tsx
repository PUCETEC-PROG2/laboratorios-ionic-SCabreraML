import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSpinner,
} from "@ionic/react";

import "./Tab3.css";

import { GithubUser } from "../interfaces/GithubUser";
import { fetchUserInfo } from "../services/GithubServices";

const Tab3: React.FC = () => {
  const [userInfo, setUserInfo] = React.useState<GithubUser | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<string>("");

  const loadUser = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const user = await fetchUserInfo();
      setUserInfo(user);
    } catch (error) {
      setErrorMsg("Error al cargar el usuario de GitHub");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadUser();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de usuario</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de usuario</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* LOADING */}
        {loading && (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <IonSpinner name="crescent" />
          </div>
        )}

        {/* ERROR */}
        {errorMsg && (
          <p style={{ color: "red", textAlign: "center" }}>
            {errorMsg}
          </p>
        )}

        {/* USER CARD */}
        {userInfo && (
          <div className="card-container">
            <IonCard className="card">
              <img
                src={userInfo.avatar_url}
                alt="imagen de usuario"
              />

              <IonCardHeader>
                <IonCardTitle>{userInfo.name}</IonCardTitle>
                <IonCardTitle>{userInfo.login}</IonCardTitle>
              </IonCardHeader>

              <p>{userInfo.bio || "Sin biografía disponible"}</p>
            </IonCard>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;