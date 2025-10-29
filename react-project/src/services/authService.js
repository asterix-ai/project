import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, projectId } from './firebase';

export const signUpUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Add user to the 'members' subcollection for project isolation
    // This ensures only members of this specific projectId can access its data
    await setDoc(doc(db, `projects/${projectId}/members`, user.uid), {
      email: user.email,
      roles: ['member'], // Default role for new sign-ups
      createdAt: new Date(),
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};
