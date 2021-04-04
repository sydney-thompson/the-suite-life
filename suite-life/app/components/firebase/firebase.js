import * as firebase from "firebase";
import "firebase/auth";
import { ErrorMessage } from "../forms";

import firebaseConfig from "./firebaseConfig";

// Initialize firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.database();