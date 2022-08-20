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
    addDoc,
    updateDoc,
    doc,
    getDoc
} from "firebase/firestore";
import { useState } from "react";

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

let userId = null;

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        let orders = []
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        docs.forEach((doc) => {
            userId = doc.id
        });
        // LOADING USER ORDERS
        const queryOrders = query(collection(db, "orders"), where("buyer.email", "==", user.email));
        await getDocs(queryOrders).then((snapshot) => {
            orders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        })
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
                orders: orders
            })
        }

        const userDoc = doc(db, "users", userId)
        updateDoc(userDoc, { orders: orders })
        
    } catch (err) {
        console.error(err);
        alert(err.message);
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