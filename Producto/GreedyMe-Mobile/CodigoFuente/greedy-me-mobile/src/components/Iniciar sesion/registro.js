import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Form, TextValidator } from 'react-native-validator-form';

function Registro(props) {
  const [formData, setFormData] = React.useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    repeticion: '',
  });

  const handleChange = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData({ ...formData });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  /* const handleChangeEmail = (email) => {
    setEmail(email);
  };

  const handleChangePassword = (password) => {
    setPassword(password);
  }; */
  const form = React.createRef();

  return (
    <KeyboardAvoidingView
      style={styles.containerTeclado}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      enabled={Platform.OS === 'ios'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Form ref={form} onSubmit={handleSubmit}>
            <TextValidator
              style={styles.inputEmailPass}
              placeholderTextColor="#000000"
              required
              label="Nombre"
              name="nombre"
              validators={['required']}
              errorMessages={['* Este campo es obligatorio']}
              placeholder="Nombre"
              type="text"
              value={formData.nombre}
              onChangeText={handleChange}
              errorStyle={{
                container: { top: 0, left: 20, position: 'relative' },
                text: { color: 'red' },
                underlineValidColor: '#1E1B4D',
                underlineInvalidColor: 'red',
              }}
            />
            <TextValidator
              style={styles.inputEmailPass}
              placeholderTextColor="#000000"
              required
              label="Apellido"
              name="apellido"
              validators={['required']}
              errorMessages={['* Este campo es obligatorio']}
              placeholder="Apellido"
              type="text"
              value={formData.apellido}
              onChangeText={handleChange}
              errorStyle={{
                container: { top: 0, left: 20, position: 'relative' },
                text: { color: 'red' },
                underlineValidColor: '#1E1B4D',
                underlineInvalidColor: 'red',
              }}
            />
            <TextValidator
              style={styles.inputEmailPass}
              placeholderTextColor="#000000"
              required
              label="Email"
              name="email"
              validators={['isEmail']}
              errorMessages={['* El email no es válido']}
              placeholder="Email"
              type="text"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={handleChange}
              errorStyle={{
                container: { top: 0, left: 20, position: 'relative' },
                text: { color: 'red' },
                underlineValidColor: '#1E1B4D',
                underlineInvalidColor: 'red',
              }}
            />
            <TextValidator
              style={styles.inputEmailPass}
              placeholderTextColor="#000000"
              required
              name="password"
              label="text"
              placeholder="Contraseña"
              secureTextEntry
              validators={['required']}
              errorMessages={['* Este campo es requerido']}
              type="text"
              value={formData.password}
              onChangeText={handleChange}
              errorStyle={{
                container: { top: 0, left: 20, position: 'relative' },
                text: { color: 'red' },
                underlineValidColor: '#1E1B4D',
                underlineInvalidColor: 'red',
              }}
            />
            <TextValidator
              style={styles.inputEmailPass}
              placeholderTextColor="#000000"
              required
              name="repeticion"
              label="text"
              placeholder="Confirmar contraseña"
              secureTextEntry
              validators={['required']}
              errorMessages={['* Este campo es requerido']}
              type="text"
              value={formData.repeticion}
              onChangeText={handleChange}
              errorStyle={{
                container: { top: 0, left: 20, position: 'relative' },
                text: { color: 'red' },
                underlineValidColor: '#1E1B4D',
                underlineInvalidColor: 'red',
              }}
            />
          </Form>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  containerTeclado: {
    flex: 1,
  },
  inputEmailPass: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
    paddingLeft: 5,
    height: 55,
    fontSize: 18,
  },
});

export default Registro;
