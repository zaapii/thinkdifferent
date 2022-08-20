import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBBcEYbloT8f-afJPn-TcLUQ5tbgLbdyb4",
    authDomain: "thinkdifferent-56240.firebaseapp.com",
    projectId: "thinkdifferent-56240",
    storageBucket: "thinkdifferent-56240.appspot.com",
    messagingSenderId: "840358170063",
    appId: "1:840358170063:web:5a9ef35ac17d2998cad6ba"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email
            })
        }
    } catch (err) {
        alert(err.message)
    }
}

const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    signInWithGoogle,
    logout,
};