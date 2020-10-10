const initState = {
  authError: null,
  mailError: null,
  mandoMail: null,
  user: null,
  crearUsuario: null,
  creacionError: null,
  logeado: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'INICIO_FALLIDO':
      console.log('login errrrrrr f');
      return {
        ...state,
        authError: 'Fallo el inicio de sesión',
      };

    case 'INICIO_CORRECTO':
      console.log('login succes wachin');
      return {
        ...state,
        authError: null,
        logeado: null,
      };

    case 'SESION_CERRADA':
      console.log('te fuiste');
      return state;

    case 'CONTRASEÑA_REESTABLECIDA':
      console.log('se envio un mail');
      return {
        ...state,
        mailError: null,
        mandoMail: 'mail enviado',
      };
    case 'EMAIL_INVALIDO':
      console.log('mal ahi man le erraste en el mail');
      return {
        ...state,
        mailError: 'email invalido',
        mandoMail: null,
      };
    case 'RESETEAR_VALORES':
      console.log('se resetearon');
      return {
        ...state,
        mailError: null,
        mandoMail: null,
      };
    case 'RESETEAR_VALORES_CREACION_USUARIO':
      console.log('se resetearon');
      return {
        ...state,
        creacionError: null,
      };

    case 'USUARIO_CREADO':
      console.log('se creo usuario');
      return {
        ...state,
        creacionError: null,
        crearUsuario: 'se creo usuario',
      };
    case 'FALLO_CREACION':
      console.log('no se creo el pinche usuario');
      return {
        ...state,
        creacionError: action.error.message,
        crearUsuario: null,
      };
    default:
      return state;
  }
};

export default authReducer;
