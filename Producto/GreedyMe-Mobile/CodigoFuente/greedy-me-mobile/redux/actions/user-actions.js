export const editarDatos = (datos) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const firestore = getFirestore();
    firestore
      .collection('usuarioConsumidor')
      .doc(datos.id)
      .update({
        nombre: datos.nombre,
      })
      .then(() => {
        dispatch({ type: 'EDITAR_DATOS' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_DATOS', error });
      });
  };
};
