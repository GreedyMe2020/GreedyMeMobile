const initState = {
  authError: null,
  mailError: null,
  mandoMail: null,
  user: null,
  crearUsuario: null,
  creacionError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'INICIO_FALLIDO':
      console.log('login error');
      return {
        ...state,
        authError: 'Fallo el inicio de sesión',
      };
    case 'INICIO_CORRECTO':
      console.log('login correcto');
      return {
        ...state,
        authError: null,
      };
    case 'SESION_CERRADA':
      console.log('se cerró la sesión');
      return state;
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
    //LOGIN CON GMAIL
    /*case 'LOGGED_IN':
      console.log('Login con gmail');
      return {
        ...state,
        user: action.user,
      };
    case 'SIGN_OUT':
      console.log('logout con gmail');
      return {
        ...state,
        user: null,
      };*/

    case 'USUARIO_CREADO':
      console.log('se creo usuario');
      return {
        ...state,
        creacionError: null,
        crearUsuario: 'se creo usuario',
      };
    case 'FALLO_CREACION':
      console.log('no se creo el usuario');
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
