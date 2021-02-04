const initState = {
  authError: null,
  mailError: null,
  mandoMail: null,
  user: null,
  crearUsuario: null,
  creacionError: null,
  logeo: null,
  deslogeo: null,
  usuarioNuevo: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'INICIO_FALLIDO':
      console.log('login error');
      return {
        ...state,
        logeo: null,
        authError: 'Fallo el inicio de sesión',
      };

    case 'INICIO_CORRECTO':
      console.log('login correcto');
      return {
        ...state,
        authError: null,
      };

    case 'SESION_CERRADA':
      console.log('se cerró la sesión, login true');
      return {
        ...state,
        deslogeo: 'TRUE',
        usuarioNuevo: null,
      };

    case 'CONTRASEÑA_REESTABLECIDA':
      console.log('se envio un mail');
      return {
        ...state,
        mailError: null,
        mandoMail: 'mail enviado',
      };
    case 'EMAIL_INVALIDO':
      console.log('mail incorrecto');
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

    case 'RESETEAR_VALORES_INICIO_SESION':
      console.log('se resetearon');
      return {
        ...state,
        authError: null,
      };
    case 'SETEAR_LOGEO_TRUE':
      console.log('se reseteó login true');
      return {
        ...state,
        logeo: 'TRUE',
      };
    case 'SETEAR_LOGEO_FALSE':
      console.log('se reseteó login false');
      return {
        ...state,
        logeo: null,
      };
    case 'SETEAR_DESLOGEO_TRUE':
      console.log('se reseteó deslogin true');
      return {
        ...state,
        deslogeo: 'TRUE',
      };
    case 'SETEAR_DESLOGEO_FALSE':
      console.log('se reseteó deslogin false');
      return {
        ...state,
        deslogeo: null,
      };
    case 'USUARIO_CREADO':
      console.log('se creo usuario');
      return {
        ...state,
        creacionError: null,
        crearUsuario: 'se creo usuario',
        usuarioNuevo: 'TRUE',
      };
    case 'FALLO_CREACION':
      console.log('no se creo el usuario');
      return {
        ...state,
        creacionError: action.error.message,
        crearUsuario: null,
      };
    case 'NUEVO_USUARIO_TRUE':
      console.log('es nuevo usuario');
      return {
        ...state,
        usuarioNuevo: 'TRUE',
      };
    case 'NUEVO_USUARIO_FALSE':
      console.log('ya no es nuevo usuario');
      return {
        ...state,
        usuarioNuevo: null,
      };
    default:
      return state;
  }
};

export default authReducer;
