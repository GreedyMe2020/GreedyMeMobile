import React from 'react';

const PromocionesContext = React.createContext({});

export function PromocionesContextProvider({ children }) {
  const [contextPromociones, setContextPromociones] = React.useState([]);
  return (
    <PromocionesContext.Provider
      value={{ contextPromociones, setContextPromociones }}
    >
      {children}
    </PromocionesContext.Provider>
  );
}

export default PromocionesContext;