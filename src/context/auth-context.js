import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  username: null,
  token: null,
  id: null,
  preference: null,
  login: () => {},
  logout: () => {},
  changePreference: () => {},
});
