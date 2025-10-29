import { collection, addDoc, getDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage, projectId } from './firebase';

// Base path for products in Firestore, ensuring project isolation
const getProductsCollectionRef = () => collection(db, `projects/${projectId}/products`);

export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(getProductsCollectionRef(), productData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const getProduct = async (id) => {
  try {
    const docRef = doc(db, `projects/${projectId}/products`, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const docRef = doc(db, `projects/${projectId}/products`, id);
    await updateDoc(docRef, productData);
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const docRef = doc(db, `projects/${projectId}/products`, id);
    const productSnap = await getDoc(docRef);

    if (productSnap.exists()) {
      const product = productSnap.data();
      // If there's an image URL, attempt to delete the image from storage if it's a Firebase Storage URL
      if (product.imageUrl && product.imageUrl.includes('firebasestorage.googleapis.com')) {
        try {
          // Extract path from URL for ref creation (simplified, might need more robust parsing)
          const imageUrlPath = product.imageUrl.split('?')[0].split('%2F').slice(1).join('/');
          const imageRef = ref(storage, decodeURIComponent(imageUrlPath));
          await deleteObject(imageRef);
          console.log('Image deleted from storage:', product.imageUrl);
        } catch (storageError) {
          console.warn('Could not delete image from storage (it might not be a Firebase Storage URL or already deleted):', storageError.message);
          // Don't rethrow, proceed to delete Firestore document even if image deletion fails
        }
      }
      await deleteDoc(docRef);
    } else {
      console.warn(`Product with ID ${id} not found.`);
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// For direct file uploads, more UI and logic would be needed in the component and a function here.
// Example for uploading a file (would be called from component):
/*
import { uploadBytes, getDownloadURL } from 'firebase/storage';
export const uploadProductImage = async (file, productId) => {
  const storageRef = ref(storage, `projects/${projectId}/images/${productId}/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};
*/