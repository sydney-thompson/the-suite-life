import { auth, db } from "./firebase";

export async function getSuitematesList(suiteID, uid = null) {
  if (!uid) {
    uid = auth.currentUser.uid;
  }
  let suitemates = {};
  db.ref(`suites/${suiteID}/users`).on(
    "value",
    (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          const suitemate = child.val();
          if (suitemate.uid != uid) {
            suitemates[suitemate.uid] = suitemate.balances;
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

// Creates a new user
export async function createUser(uid, name, pronouns, photoURL, suiteID) {
  const userExists = await checkUserExists(uid);
  if (userExists) throw new Error("User already exists");

  // get list of suitemates
  const suitemateList = await getSuitematesList(suiteID, uid);
  let emptyBalances = {};
  Object.keys(suitemateList).forEach((suitemate) => {
    emptyBalances[suitemate] = 0;
    const sm_balances = suitemateList[suitemate];
    sm_balances[uid] = 0;
    db.ref(`users/${suitemate}/balances`).set(updated_balances);
  });
  if (suitemateList == []) {
    emptyBalances = "None";
  }

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

// ONE-TIME USE initialize balance for all test users to zero
/* export async function temporary_InitBalances() {

  const testsuite_ids = ["3W6ZDlPdDhWmPxvPGVBSa9U3A4l2", "8lh1VeoQrtb3gAWFEDt7Dfbwvzd2",
  "IdIiDUvCu9bnb5QkdwmThJoAi863", "SbyVXqeCisX8IvEnZosxFHytqw53",
  "b3q3PcKIfdgUapdHbkCLgsUtWQ83", "mJNOAnpK4ZTF5v9MeLSFa5nqCrH3",
  "oiZtBtU47TW3C6UA7tFq5KV5UW12", "yjGDsdtY9jNjjpyMaEWHFFzhQa43",
  "z0Ax8ZANZdSZNFdr3o7TeDdDAal2"];

  testsuite_ids.forEach((suitemate) => {
    let emptyBalances = {};
    testsuite_ids.forEach((sub_suitemate) => {
      if (sub_suitemate != suitemate) {
        emptyBalances[sub_suitemate] = 0
      }
    });
    db.ref(`users/${suitemate}/balances`).set(emptyBalances);
  });
}  */

// Delete a user
export function deleteUser(toDeleteID) {
  let toDelete = db.ref(`/users/${toDeleteID}`);
  toDelete.remove();
}

// Checks if the uid is in the users database
export function checkUserExists(uid = null) {
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
  return db.ref(`users/${uid}`).update({
    // initialize to empty arrays by default
    suiteID: suiteID,
  });
}

export function updateUserDetails(uid, name, pronouns) {
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
  })
}

export async function updateFeedback(text) {
  let uid = auth.currentUser.uid;
  db.ref(`users/${uid}/feedback`).set(text);

  /*const ref = db.ref(`users/${uid}/feedback`);
  ref.once("value", (snapshot) => {
    if (snapshot.val() == "N/A") {
      db.ref(`users/${uid}/feedback`).set(text);
    } else {
      const text_append = snapshot.val() + text;
      db.ref(`users/${uid}/feedback`).set(text_append);
    }
  }); */
  
  return true;
}

export async function getFeedback() {
  return new Promise((resolve, reject) => {
    let uid = auth.currentUser.uid;
    db.ref(`users/${uid}/feedback`).once("value", (snapshot) => {
      resolve(snapshot.val());
    });
  });
}
