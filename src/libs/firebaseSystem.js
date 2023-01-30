import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator, signOut } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator, setDoc, doc, getDoc } from 'firebase/firestore'
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

/**
 * 
 * @param {import('firebase/auth').User} user 
 */
export async function newUserData(user) {

    const firestore = getFirestore()
    const userDoc = doc(firestore, "users", user.uid)

    const docCheck = await getDoc(userDoc)

    if (docCheck.exists()) {
        return
    }

    logger.info("New user detected, creating user data...")

    await setDoc(userDoc, {
        creation_date: new Date(),
        exp: 0,
        last_level_date: new Date(),
        level: 0,
        level_passed: 0,
        streak: 0,
    })

    logger.success("Created new data for the user")
}

export function getUser(store) {
    return store.state.user
}

export async function getUserData(store) {

    const firestore = getFirestore()

    const user = getUser(store)

    console.log(user)

    const userDoc = doc(firestore, "users", user.uid)

    const docData = await getDoc(userDoc)

    if (docData.exists()) {
        return docData.data()
    } else {
        return false
    }
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
