import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBCGQwkZ_enOsBbkbKjEExAPt9kcllfGLs",
    authDomain: "coding-pingkai.firebaseapp.com",
    projectId: "coding-pingkai",
    storageBucket: "coding-pingkai.appspot.com",
    messagingSenderId: "80239470416",
    appId: "1:80239470416:web:fd3ffaa6f41f9be3f3ae55"
};

export function initApp() {
    const app = initializeApp(firebaseConfig)

    if (import.meta.env.MODE == "development") {
        connectAuthEmulator(getAuth(), `http://localhost:${import.meta.env.VITE_AUTH_PORT}`, {
            disableWarnings: true
        });
    }

    return app
}
