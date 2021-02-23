import * as firebase from 'firebase';
import 'firebase/auth';

import firebaseConfig from './firebaseConfig';

// Initialize firebase app

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export const registerWithEmail = (email, password) => {
    auth.createUserWithEmailAndPassword(email, password);
}

export const loginWithEmail = (email, password) => {
    auth.signInWithEmailAndPassword(email, password);
}

export const logout = () => {
    auth.signOut();
}

export const passwordReset = (email) => {
    auth.sendPasswordResetEmail(email);
}