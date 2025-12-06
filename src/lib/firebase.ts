import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported, logEvent as firebaseLogEvent, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase only if it hasn't been initialized
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// Analytics - cached promise pattern (recommended by Firebase for Next.js)
// See: https://stackoverflow.com/questions/66812479
let analyticsPromise: Promise<Analytics | null> | null = null;

const getAnalyticsInstance = (): Promise<Analytics | null> => {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  if (!analyticsPromise) {
    analyticsPromise = isSupported().then((supported) =>
      supported ? getAnalytics(app) : null
    );
  }

  return analyticsPromise;
};

// Helper function to log custom events
const logEvent = async (eventName: string, eventParams?: Record<string, unknown>) => {
  const analytics = await getAnalyticsInstance();
  if (analytics) {
    firebaseLogEvent(analytics, eventName, eventParams);
  }
};

export { db, getAnalyticsInstance, logEvent };
