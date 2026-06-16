import { IonCard, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
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

        <div className="card-container">
          <IonCard
          className='card'>
            <img src="https://avatars.githubusercontent.com/u/191403505?v=4" alt="imagen de usuario" />
          
          <IonCardHeader>
            <IonCardTitle>Sebastián Cabrera</IonCardTitle>
            <IonCardTitle>SCabreraML</IonCardTitle>
          </IonCardHeader>
          
          <p>Estudiante de cuarto nivel de la carrera de desarrollo de software en la PUCE</p>
          
          </IonCard>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
