import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator, signOut } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import Swal from 'sweetalert2';
import * as logger from 'libs/logger.js'

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

        connectFirestoreEmulator(getFirestore(), "localhost", import.meta.env.VITE_FIRESTORE_PORT)
    
        logger.success("Emulators Connected")
    }

    return app
}

export function addUserData() {

}

export async function promptLogout() {
    const auth = getAuth()

    const res = await Swal.fire({
        title: 'ยืนยันการออกจากระบบ',
        text: "คุณต้องการที่จะออกจากระบบหรือไม่?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#F23051',
        cancelButtonColor: '#CC8866',
        confirmButtonText: 'ออกจากระบบ',
        cancelButtonText: 'ยกเลิก',
    })

    if (res.isConfirmed) {
        signOut(auth)

        window.location.reload()
    }
}
