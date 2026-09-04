import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    'AIzaSyCETBo46qRQypRT1oF8y67fe9B6VRiZ-io',
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    'backseat-driver-2.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'backseat-driver-2',
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    'backseat-driver-2.firebasestorage.app',
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '958744036936',
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    '1:958744036936:web:a87441e189fd575e3ffa7d',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default db;
