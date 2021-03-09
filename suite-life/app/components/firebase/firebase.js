import * as firebase from "firebase";
import "firebase/auth";

import firebaseConfig from "./firebaseConfig";

// Initialize firebase app

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.database();

export const createSuite = (
  suite_id,
  suite_name,
) => {
  db.ref("suites/" + suite_id).set({ // initialze to empty arrays by default
    chores: [],
    transactions: [],
    messages: [],
    users: [auth.currentUser.uid],
    id: suite_id,
    name: suite_name,
  });
};

export const createUser = (
  name,
  pronouns,
) => {
  db.ref("users/" + name).set({ // initialze to empty arrays by default
    id: auth.currentUser.uid,
    name: name,
    pronouns: pronouns,
    suite_id: null,
  });
};

export const updateUserSuite = (
  user_id,
  suite_id,
) => {
  db.ref("users/" + user_id).set({ // initialze to empty arrays by default
    suite_id: suite_id,
  });
};



export var checksuite = () => {


  var suites = firebase.database().ref("suites/");

  suites.on("child_changed", function(data) {
    var player = data.val();
    console.log("The new suite is " + player.name);
    return true;
  });


}




/*************************************************************************************************************************** 


// authorization
export const registerWithEmail = (email, password) => {
  auth.createUserWithEmailAndPassword(email, password);
};

export const loginWithEmail = (email, password) => {
  auth.signInWithEmailAndPassword(email, password);
};

export const logout = () => {
  auth.signOut();
};

export const passwordReset = (email) => {
  auth.sendPasswordResetEmail(email);
};





// writing data
export const updatePerson = (userId, name, email, pronouns, suite_tag) => {
  db.ref("users/" + userId).set({
    name: name,
    email: email,
    pronouns: pronouns,
    suite_tag: suite_tag,
  });
};

/*
export const updateSuite = (
  chores,
  transactions,
  messages,
  persons,
  suite_tag
) => {
  db.ref("suites/" + suiteId).set({
    chores: chores,
    transactions: transactions,
    messages: messages,
    persons: persons,
    suite_tag: suite_tag,
  });
}; */



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
