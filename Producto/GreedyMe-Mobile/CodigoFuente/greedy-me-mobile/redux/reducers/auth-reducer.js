const initState = {
  authError: null,
  mailError: null,
  mandoMail: null,
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

    default:
      return state;
  }
};

export default authReducer;