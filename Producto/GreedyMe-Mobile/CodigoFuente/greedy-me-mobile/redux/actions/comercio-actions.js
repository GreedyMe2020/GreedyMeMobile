export const cargarComerciosAdheridos = (comercio) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const firestore = getFirestore();
    firestore
    .collection("usuarioConsumidor")
    .doc(comercio.id)
    .collection("promociones")
    .doc(id)
    .set({
      tipoPromo: promocion.tipoPromo,
      valuePromo: promocion.valuePromo,
      otraPromo: promocion.otraPromo,
      tipoProveedor: promocion.tipoProveedor,
      valueProveedor: promocion.valueProveedor,
      otroProveedor: promocion.otroProveedor,
      desdeVigencia: desdeVigencia,
      hastaVigencia: hastaVigencia,
      visible: false,
      descripcion: promocion.descripcion,
      photoURL: promocion.photoURL,
      diaAplicacion: dias,
      medioPago: value,
    })
      .then(() => {
        dispatch({ type: 'COMERCIO_AGREGADO' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_FAVORITOS', error });
      });
  };
};


return (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  