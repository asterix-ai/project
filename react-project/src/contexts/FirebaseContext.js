import React, { createContext } from 'react';
import { app, auth, db, storage, projectId } from '../services/firebase'; // Import directly from firebase.js

export const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ app, auth, db, storage, projectId }}>
      {children}
    </FirebaseContext.Provider>
  );
};
