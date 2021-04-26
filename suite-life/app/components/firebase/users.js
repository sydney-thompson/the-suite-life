import { auth, db } from "./firebase";

export async function getSuitematesList(suiteID, uid = null) {
  /**
   * Get static list of suitemates from {suiteID}, including current user
   * @param {string} suiteID   ID of suite to query for suitemates
   */
  if (!uid) {
    uid = auth.currentUser.uid;
  }
  let suitemates = [];
  await db.ref(`suites/${suiteID}/users`).once(
    "value",
    (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          const suitemate = child.val();
          if (suitemate.uid != uid) {
            suitemates.push(suitemate.uid);
          }
        });
      }
    },
    (err) => {
      console.error(err);
    }
  );
  return suitemates;
}

export async function createUser(uid, name, pronouns, photoURL, suiteID) {
  /**
   * Create a new user
   * @param {string} uid   User id
   * @param {string} name  User's name
   * @param {string} pronouns User's pronouns
   * @param {string} photoURL URL for user's profile photo
   * @param {string} suiteID  ID of suite to which user belongs
   */
  const userExists = await checkUserExists(uid);
  if (userExists) throw new Error("User already exists");

  // get list of suitemates
  const suitemateList = await getSuitematesList(suiteID, uid);
  let emptyBalances = {};
  suitemateList.forEach((suitemate) => {
    emptyBalances[suitemate] = 0;
    db.ref(`users/${suitemate}/balances/${uid}`).set(0);
  });
  if (suitemateList == []) {
    emptyBalances = {};
  }
  console.log("empty balances: ", emptyBalances);

  return db.ref(`users/${uid}`).set({
    // initialize to empty arrays by default
    balances: emptyBalances,
    name: name,
    photoURL: photoURL,
    pronouns: pronouns,
    suiteID: suiteID,
    uid: uid,
    feedback: "Please type comments or feedback here!",
  });
}

// Delete a user
export function deleteUser(toDeleteID) {
  /**
   * Delete user from firebase
   * @param {string} toDeleteID   ID of user to delete
   */
  let toDelete = db.ref(`/users/${toDeleteID}`);
  toDelete.remove();
}

// Checks if the uid is in the users database
export function checkUserExists(uid = null) {
  /**
   * Check that user exists in firebase
   * @param {string} uid (default null)   ID of user to check if they exist. If null, user current user's id
   */
  return new Promise((resolve, reject) => {
    try {
      if (!uid) {
        if (!auth.currentUser.uid) {
          reject("no user id");
        } else {
          uid = auth.currentUser.uid;
        }
      }
      const ref = db.ref(`users/${uid}`);
      ref.once(
        "value",
        (snapshot) => {
          resolve(!(snapshot.val() === null));
        },
        (error) => {
          console.error("USER EXISTS ERROR: ", error);
          reject(error);
        }
      );
    } catch (err) {
      reject(err);
    }
  });
}

// Updates the user's associated suite
export function updateUserSuite(uid, suiteID) {
  /**
   * Updates the suite of user {uid}
   * @param {string} uid   ID of user to update suite id
   * @param {string} suiteID  ID of new suite to update in user obejct
   */
  return db.ref(`users/${uid}`).update({
    // initialize to empty arrays by default
    suiteID: suiteID,
  });
}

export function updateUserDetails(uid, name, pronouns) {
  /**
   * Updates editable user details
   * @param {string} uid   ID of user to update
   * @param {string} name  Updated user name
   * @param {string} pronouns Updated user pronouns
   */
  return new Promise((resolve, reject) => {
    Promise.all([checkUserExists(uid)])
      .then((res) => {
        const user = db.ref(`users/${uid}`);
        user.update({
          name: name,
          pronouns: pronouns,
        });
        resolve();
      })
      .catch((err) => {
        console.error(err);
        reject();
      });
  });
}

export function getUserData(uid = null) {
  /**
   * Get one-time user information from firebase
   * @param {string} uid (default null)  ID of user to query for data. If null, user current user.
   */
  if (!uid) {
    uid = auth.currentUser.uid;
  }
  return new Promise((resolve, reject) => {
    if (!auth.currentUser) {
      console.error("auth has no user");
      reject();
    }
    if (!uid) {
      uid = auth.currentUser.uid;
    }
    const ref = db.ref(`users/${uid}`);
    ref
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          resolve(userData);
        } else {
          reject({ code: "user-not-found" });
        }
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

export function getUserDataConnection(setUser, uid = null) {
  /**
   * Get connection to user object in firebase
   * @param {function} setUser   state update function to handle changes to user object
   * @param {string} uid (default null) ID of user to extablish connection. If null, user current user
   */
  if (!uid) {
    uid = auth.currentUser.uid;
  }
  return new Promise((resolve, reject) => {
    if (!auth.currentUser) {
      console.error("auth has no user");
      reject();
    }
    if (!uid) {
      uid = auth.currentUser.uid;
    }
    const ref = db
      .ref(`users/${uid}`)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUser(userData);
        } else {
          reject({ code: "user-not-found" });
        }
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

export async function updateFeedback(text) {
  /**
   * Update current user's feedback in firebase
   * @param {string} text   user feedback
   */
  let uid = auth.currentUser.uid;
  db.ref(`users/${uid}/feedback`).set(text);

  return true;
}

export async function getFeedback() {
  /**
   * Retrieve user's feedback from firebase
   */
  return new Promise((resolve, reject) => {
    let uid = auth.currentUser.uid;
    db.ref(`users/${uid}/feedback`).once("value", (snapshot) => {
      resolve(snapshot.val());
    });
  });
}
