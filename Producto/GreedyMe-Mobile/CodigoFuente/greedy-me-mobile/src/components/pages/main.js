import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import Inicio from './inicio';
import Cupones from './cupones';
import Favoritos from './favoritos';
import Buscador from './buscar';
import Perfil from './perfil';

const Main = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'inicio', title: 'Inicio', icon: 'home', color: '#1E1B4D' },
    { key: 'buscador', title: 'Buscador', icon: 'magnify', color: '#76B39D' },
    { key: 'cupones', title: 'Cupones', icon: 'qrcode-scan', color: '#F7941E' },
    { key: 'favoritos', title: 'Favoritos', icon: 'heart', color: '#76B39D' },
    { key: 'perfil', title: 'Perfil', icon: 'account', color: '#1E1B4D' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    inicio: Inicio,
    cupones: Cupones,
    favoritos: Favoritos,
    buscador: Buscador,
    perfil: Perfil,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeColor="white"
    />
  );
};

export default Main;
