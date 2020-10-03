import * as React from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';
import { LogBox } from 'react-native';
//esconde los warnings
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

function Inicio(props) {
  //estados para el permiso de ubicacion
  const [estadoGeo, setEstadoGeo] = React.useState(null);
  const [errorMsgGeo, setErrorMsgGeo] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsgGeo('El permiso para acceder a la ubicación fue denegado');
        setEstadoGeo(status);
      } else {
        setEstadoGeo(status);
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Ahora estas en el inicio</Text>
    </View>
  );
}

export default Inicio;
