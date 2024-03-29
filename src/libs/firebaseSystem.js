import { getFirestore, connectFirestoreEmulator, setDoc, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
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
    return new Promise(async (resolve) => {
        const { initializeApp } = await import('firebase/app')
        const { getPerformance } = await import('firebase/performance')
        const { getAuth, connectAuthEmulator } = await import('firebase/auth')
        const { getStorage, connectStorageEmulator } = await import('firebase/storage')

        const app = initializeApp(firebaseConfig)

        getPerformance(app)

        if (import.meta.env.MODE == "development") {
            connectAuthEmulator(getAuth(), `http://localhost:${import.meta.env.VITE_AUTH_PORT}`, {
                disableWarnings: true
            });

            connectStorageEmulator(getStorage(app), "127.0.0.1", import.meta.env.VITE_STORAGE_PORT)

            connectFirestoreEmulator(getFirestore(), "localhost", import.meta.env.VITE_FIRESTORE_PORT)

            logger.success("Emulators Connected")
        }

        getAuth().onAuthStateChanged((user) => {
            return resolve([app, user])
        });
    })
}

/**
 * 
 * @param {import('firebase/auth').User} user 
 * @returns {boolean} Is new user?
 */
export async function newUserData(user) {

    const firestore = getFirestore()
    const userDoc = doc(firestore, "users", user.uid)

    const docCheck = await getDoc(userDoc)

    if (docCheck.exists()) {
        return false
    }

    logger.info("New user detected, creating user data...")

    let lastLevelDate = new Date()
    lastLevelDate.setDate(lastLevelDate.getDate() - 1)

    await setDoc(userDoc, {
        creation_date: new Date(),
        exp: 0,
        last_level_date: lastLevelDate,
        level: 0,
        level_passed: 0,
        streak: 0,
        userID: user.uid,
        achievements: [],
        streak_dates: []
    })

    logger.success("Created new data for the user")

    return true
}

export async function deleteUserData(user) {

    const firestore = getFirestore()
    const userDoc = doc(firestore, "users", user.uid)

    logger.info("Deleting user data...")

    await deleteDoc(userDoc)

    logger.success("Deleted!")
}

export async function writeUserData(user, data) {

    const firestore = getFirestore()
    const userDoc = doc(firestore, "users", user.uid)

    logger.info("Writing to user data...")

    await updateDoc(userDoc, data)

    logger.success("Successfully written data into user!")
}

export function getUser(store) {
    return store.state.user
}

export async function writeStorageData(store, filePath, fileData) {
    const { getStorage, ref, uploadString } = await import("firebase/storage");

    const user = getUser(store)

    const storage = getStorage();

    let savePath = `/userData/${user.uid}/${filePath}`
    logger.info(`Saving data to ${savePath}`)

    const spaceRef = ref(storage, savePath);

    await uploadString(spaceRef, fileData);
}

export function readStorageData(store, filePath) {
    return new Promise(async (resolve) => {
        const { getStorage, ref, getDownloadURL } = await import("firebase/storage");

        const user = getUser(store)

        const storage = getStorage();
        let savePath = `/userData/${user.uid}/${filePath}`
        logger.info(`Reading "${savePath}"...`)

        const spaceRef = ref(storage, savePath);

        const downloadURL = await getDownloadURL(spaceRef).catch(error => {
            if (error.code === 'storage/object-not-found') {
                return resolve(false);
            }
        })
        const res = await fetch(downloadURL)
        const data = await res.text()

        resolve(data)
    })
}

export async function getUserData(store) {

    const firestore = getFirestore()

    const user = getUser(store)

    console.log(user)

    const userDoc = doc(firestore, "users", user.uid)

    const docData = await getDoc(userDoc)

    if (docData.exists()) {

        store.state.userData = docData.data()

        return docData.data()
    } else {
        return false
    }
}

export async function getUserDataNStore(user) {

    const firestore = getFirestore()

    const userDoc = doc(firestore, "users", user.uid)

    const docData = await getDoc(userDoc)

    if (docData.exists()) {
        return docData.data()
    } else {
        return false
    }
}

export async function promptLogout() {
    const { getAuth, signOut } = await import('firebase/auth')

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

        window.location.href = "/"
    }
}
