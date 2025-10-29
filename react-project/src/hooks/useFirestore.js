import { useState, useEffect, useContext } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { FirebaseContext } from '../contexts/FirebaseContext';

export const useFirestore = (collectionName) => {
  const { db, projectId } = useContext(FirebaseContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Ensure Firestore DB, Project ID, and Collection name are available
    if (!db || !projectId || !collectionName) {
      setError(new Error('Firestore DB, Project ID, or Collection name is not provided.'));
      setLoading(false);
      return;
    }

    // Construct the collection path for data isolation
    const collectionPath = `projects/${projectId}/${collectionName}`;
    const q = query(collection(db, collectionPath), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setData(items);
      setLoading(false);
      setError(null);
    }, (firestoreError) => {
      console.error(`Error fetching data from ${collectionPath}:`, firestoreError);
      setError(firestoreError);
      setLoading(false);
    });

    // Unsubscribe from snapshot listener when component unmounts or dependencies change
    return () => unsubscribe();
  }, [db, projectId, collectionName]); // Dependencies for useEffect

  return { data, loading, error };
};
