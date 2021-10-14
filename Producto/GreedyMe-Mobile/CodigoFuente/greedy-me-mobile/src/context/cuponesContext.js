import React from 'react';

const CuponesContext = React.createContext({});

export function CuponesContextProvider({ children }) {
  const [contextCupones, setContextCupones] = React.useState([]);
  return (
    <CuponesContext.Provider value={{ contextCupones, setContextCupones }}>
      {children}
    </CuponesContext.Provider>
  );
}

export default CuponesContext;
