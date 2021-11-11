import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/auth';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  const { user } = useAuth();
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (user.id) {
      setLogged(true);
    }
  }, []);

  return <NavigationContainer>{user.id ? <AppRoutes /> : <AuthRoutes />}</NavigationContainer>;
}
