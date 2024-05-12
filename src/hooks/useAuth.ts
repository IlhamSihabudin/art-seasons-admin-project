import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const useAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get('access-token-admin');
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  const logout = () => {
    Cookies.remove('access-token-admin');
  };

  return {
    accessToken,
    logout
  };
};

export default useAuth;