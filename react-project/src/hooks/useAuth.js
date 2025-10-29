import { useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseContext } from '../contexts/FirebaseContext';

export const useAuth = () => {
  const { auth } = useContext(FirebaseContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Auth state changed:', currentUser ? currentUser.email : 'No user');
      setUser(currentUser);
      setLoading(false);
      setError(null);
    }, (authError) => {
      console.error('Auth state error:', authError);
      setError(authError);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  return { user, loading, error };
};
