import { useState, useEffect } from 'react';
import { setAuthenticated, isAuthenticated, clearAuthentication } from '../lib/storage';
import { ADMIN_PASSWORD } from '../lib/utils';

export function useAuth() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoggedIn(isAuthenticated());
    setLoading(false);
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    clearAuthentication();
    setLoggedIn(false);
  };

  return {
    loggedIn,
    loading,
    login,
    logout
  };
}
