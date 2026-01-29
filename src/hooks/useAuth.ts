import { useState, useCallback, useEffect } from 'react';
import { authAPI } from '../services/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Vérifier le profil de l'utilisateur au chargement
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await authAPI.getProfile();
          setUser(response.data.user);
        } catch (err) {
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const register = useCallback(async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.register(userData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      return { success: true, user };
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'inscription');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      const response = await authAPI.login(email, password);
      const { token, user } = response.data;
      console.log('✅ Login response:', response.data);
      localStorage.setItem('token', token);
      setUser(user);
      console.log('👤 User mis à jour:', user);
      return { success: true, user };
    } catch (err) {
      console.error('❌ Login error:', err.response?.data);
      setError(err.response?.data?.message || 'Erreur lors de la connexion');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    setError(null);
  }, []);

  const updateProfile = useCallback(async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.updateProfile(userData);
      setUser(response.data.user);
      return { success: true, user: response.data.user };
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const changePassword = useCallback(async (oldPassword, newPassword) => {
    try {
      setLoading(true);
      await authAPI.changePassword({ oldPassword, newPassword });
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du changement de mot de passe');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateProfile,
    changePassword,
  };
};
