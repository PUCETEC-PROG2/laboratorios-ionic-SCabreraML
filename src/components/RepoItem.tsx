import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonThumbnail,
} from "@ionic/react";
import { Repository } from "../interfaces/Repository";
import { pencil, trash } from "ionicons/icons";

interface RepoItemProps extends Repository {
  onEdit: () => void;
  onDelete: () => void;
}

const RepoItem: React.FC<RepoItemProps> = ({
  name,
  description,
  language,
  avatarUrl,
  onEdit,
  onDelete,
}) => {
  return (
    <IonItemSliding>
      <IonItem>
        <IonThumbnail slot="start">
          <img src={avatarUrl} alt="Avatar" />
        </IonThumbnail>

        <IonLabel>
          <h3>{name}</h3>
          <p>{description}</p>
          <p>
            <strong>Lenguaje:</strong> {language}
          </p>
        </IonLabel>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption color="warning" onClick={onEdit}>
          <IonIcon icon={pencil} slot="icon-only" />
        </IonItemOption>

        <IonItemOption color="danger" onClick={onDelete}>
          <IonIcon icon={trash} slot="icon-only" />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default RepoItem;