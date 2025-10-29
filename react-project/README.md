# React Fish Shop Project

This is a full-stack React application for a fish shop, featuring product management (CRUD operations) with Firebase integration for authentication, Firestore database, and Storage for images.

## Features

- User Authentication (Sign Up, Sign In, Sign Out)
- Product Management (Add, View, Edit, Delete products)
- Firebase Firestore for data storage
- Firebase Storage for image uploads (optional)
- Responsive design with Tailwind CSS
- Professional UI/UX with Framer Motion animations, Lucide icons, and React Hot Toast notifications.
- Dark mode support
- Data isolation per project using a unique `projectId` (`react-project-1761770245122-nzzjsna3i`).

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd react-fish-shop
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Create a Firebase Project:**
    *   Go to [Firebase Console](https://console.firebase.google.com/).
    *   Create a new project.
    *   Add a Web app to your project and copy its configuration.
    *   Enable Email/Password authentication in Firebase Auth.

4.  **Configure Environment Variables:**
    *   Create a `.env` file in the root of the project (`react-project/.env`).
    *   Add your Firebase configuration variables, prefixed with `REACT_APP_`:
        ```
        REACT_APP_FIREBASE_API_KEY=\"AIzaSyAGV2T-vtyuUMvY4JbbnasmqsxYdZfsgO4\"
        REACT_APP_FIREBASE_AUTH_DOMAIN=\"aign-ed801.firebaseapp.com\"
        REACT_APP_FIREBASE_PROJECT_ID=\"aign-ed801\"
        REACT_APP_FIREBASE_STORAGE_BUCKET=\"aign-ed801.firebasestorage.app\"
        REACT_APP_FIREBASE_MESSAGING_SENDER_ID=\"66513709331\"
        REACT_APP_FIREBASE_APP_ID=\"1:66513709331:web:c829e53b3fca16d57692e6\"
        REACT_APP_FIREBASE_MEASUREMENT_ID=\"G-RXS6M904T9\"
        ```

5.  **Run the development server:**
    ```bash
    npm start
    # or
    yarn start
    ```
    The application will open in your browser at `http://localhost:3000`.

## Firebase Security Rules for Data Isolation (Firestore)

To ensure data isolation and prevent unauthorized access, apply the following Firestore security rules. This example assumes a `members` subcollection within each `project` to define user roles.

```firestore
rules
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write to project data only if authenticated and a member of that project
    match /projects/{projectId}/{document=**} {
      allow read, write: if request.auth != null && exists(/databases/$(database)/documents/projects/$(projectId)/members/$(request.auth.uid));
      // More granular roles can be added, e.g., check for 'owner' or 'editor' role:
      // allow read, write: if request.auth != null && get(/databases/$(database)/documents/projects/$(projectId)/members/$(request.auth.uid)).data.roles.includes('owner');
    }

    // Allow read/write to members subcollection only if authenticated and it's their own member document
    match /projects/{projectId}/members/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && request.auth.uid == userId;
      // Only project owners can delete members, or if it's their own account on deletion
      allow delete: if request.auth != null && (request.auth.uid == userId || exists(/databases/$(database)/documents/projects/$(projectId)/members/$(request.auth.uid)) && get(/databases/$(database)/documents/projects/$(projectId)/members/$(request.auth.uid)).data.roles.includes('owner'));
    }
  }
}
```

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).