import React from 'react';

const ComerciosContext = React.createContext({});

export function ComerciosContextProvider({ children }) {
  const [contextComercios, setContextComercios] = React.useState([]);
  return (
    <ComerciosContext.Provider
      value={{ contextComercios, setContextComercios }}
    >
      {children}
    </ComerciosContext.Provider>
  );
}

export default ComerciosContext;
