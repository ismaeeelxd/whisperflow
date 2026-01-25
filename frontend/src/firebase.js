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
    console.warn(
      `Firebase initialization failed: Missing required environment variable(s): ${missingKeys.join(", ")}. ` +
        `This is expected if you haven't set up your .env file yet. The app will run in UI-only mode without authentication.`
    );
    return false;
  }
  return true;
}

const isConfigValid = validateFirebaseConfig(firebaseConfig);

let app;
let auth;

if (isConfigValid) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
}

export { auth };
