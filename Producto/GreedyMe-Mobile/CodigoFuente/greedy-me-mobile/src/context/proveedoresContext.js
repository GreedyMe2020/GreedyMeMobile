import React from 'react';

const ProveedoresContext = React.createContext({});

export function ProveedoresContextProvider({ children }) {
  const [contextProveedores, setContextProveedores] = React.useState([]);
  return (
    <ProveedoresContext.Provider
      value={{ contextProveedores, setContextProveedores }}
    >
      {children}
    </ProveedoresContext.Provider>
  );
}

export default ProveedoresContext;