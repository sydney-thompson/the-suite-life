import * as firebase from 'firebase';
import 'firebase/auth';

import firebaseConfig from './firebaseConfig';

// Initialize firebase app

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.database();

// authorization
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

// writing data
export const updatePerson = (userId, name, email, pronouns, suite_tag) => {
    db.ref('users/' + userId).set({
        name: name,
        email: email,
        pronouns: pronouns,
        suite_tag: suite_tag
    });
}

export const updateSuite = (chores, transactions, messages, persons, suite_tag) => {
    db.ref('suites/' + suiteId).set({
        chores: chores,
        transactions: transactions,
        messages: messages,
        persons: persons,
        suite_tag: suite_tag
    });
}

// reading data
// export const readPerson = (userId) => {
//     db.child("users").child(userId).get().then(function(snapshot) {
//         if(snapshot.exists()) {
//             console.log(snapshot.val());
//         }
//         else {
//             console.log("No data available");
//         }
//     }).catch(function(error) {
//         console.error(error);
//     });
// }