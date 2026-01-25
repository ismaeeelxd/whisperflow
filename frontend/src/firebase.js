import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const configKeyToEnvVar = {
  apiKey: "VITE_API_KEY",
  authDomain: "VITE_AUTH_DOMAIN",
  projectId: "VITE_PROJECT_ID",
  storageBucket: "VITE_STORAGE_BUCKET",
  messagingSenderId: "VITE_MESSAGING_SENDER_ID",
  appId: "VITE_APP_ID",
  measurementId: "VITE_MEASUREMENT_ID",
};

function validateFirebaseConfig(config) {
  const missingKeys = Object.entries(config)
    .filter(([, value]) => value === undefined || value === "")
    .map(([key]) => configKeyToEnvVar[key]);

  if (missingKeys.length > 0) {
    throw new Error(
      `Firebase initialization failed: Missing required environment variable(s): ${missingKeys.join(", ")}. ` +
        `Please ensure these are defined in your .env file.`,
    );
  }
}

validateFirebaseConfig(firebaseConfig);

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
