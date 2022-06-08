import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [contactIsOpen, setContactIsOpen] = useState(false);

  // ADMIN LOGIN HANDLER
  const [isLogged, setIsLogged] = useState(false);

  const authHandler = function (loggedIn) {
    setIsLogged(loggedIn);
  };

  // TOKENIS VLAID

  const [isTokenValid, setisTokenValid] = useState();

  const tokenhandler = function (tokendata) {
    setisTokenValid(tokendata);
  };

  return (
    <AuthContext.Provider
      value={{
        // ADMIN LOGIN HANDLER
        isLogged,
        authHandler,

        // TOKENIS VALIDATOR
        isTokenValid,
        tokenhandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
