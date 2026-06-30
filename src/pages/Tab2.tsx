import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  IonToast,
  IonLoading,
} from "@ionic/react";
import { useState } from "react";
import "./Tab2.css";
import { createRepository } from "../services/GithubServices";

const Tab2: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  const handleSubmit = async () => {
    if (!name.trim()) {
      setToast({ show: true, message: "El nombre es obligatorio" });
      return;
    }

    try {
      setLoading(true);

      await createRepository({
        name,
        description,
      });


      window.dispatchEvent(new Event("repo-created"));

      setToast({
        show: true,
        message: "Repositorio creado correctamente",
      });

      setName("");
      setDescription("");
    } catch (error) {
      setToast({
        show: true,
        message: "Error al crear repositorio",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="form-container">
          <IonInput
            className="form-field"
            label="Nombre del repositorio"
            labelPlacement="floating"
            placeholder="Ej: mi-repo"
            value={name}
            onIonChange={(e) => setName(e.detail.value!)}
          />

          <IonTextarea
            className="form-field"
            label="Descripción"
            labelPlacement="floating"
            placeholder="Descripción opcional"
            rows={4}
            value={description}
            onIonChange={(e) => setDescription(e.detail.value!)}
          />

          <IonButton
            expand="block"
            onClick={handleSubmit}
            disabled={!name.trim() || loading}
          >
            Guardar
          </IonButton>
        </div>

        <IonLoading isOpen={loading} message="Creando repositorio..." />

        <IonToast
          isOpen={toast.show}
          message={toast.message}
          duration={2000}
          onDidDismiss={() =>
            setToast({ show: false, message: "" })
          }
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;