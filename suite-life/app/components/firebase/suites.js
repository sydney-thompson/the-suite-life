import { auth, db } from "./firebase";

// Creates a new suite
export async function createSuite(suiteID, suiteName) {
    const suiteExists = await checkSuiteExists(suiteID);
    if (suiteExists) throw new Error("A suite with this ID already exists");
    db.ref(`suites/${suiteID}`).set({
      // initialze to empty arrays by default
      chores: [],
      id: suiteID,
      messages: [],
      name: suiteName,
      transactions: [],
      users: [],
    });
  }
  
  // Checks if suiteID is in the suites database
  export function checkSuiteExists(suiteID) {
      return new Promise((resolve, reject) => {
        const ref = db.ref(`suites/${suiteID}`);
        ref.once(
          "value",
          (snapshot) => {
            resolve(!(snapshot.val() === null));
          },
          (error) => {
            console.log("SUITE EXISTS ERROR: ", error);
            reject(error);
          }
        );
      });
  }
  
  // Creates a new user
  export async function createUser(uid, name, pronouns, suiteID) {
    const userExists = await checkUserExists(uid);
    if (userExists) throw new Error("User already exists");
    return db.ref(`users/${uid}`).set({
      // initialize to empty arrays by default
      uid: uid,
      name: name,
      pronouns: pronouns,
      suiteID: suiteID,
    });
  }
  
  // Checks if the uid is in the users database
  export function checkUserExists(uid) {
    return new Promise((resolve, reject) => {
      const ref = db.ref(`users/${uid}`);
      ref.once(
        "value",
        (snapshot) => {
          resolve(!(snapshot.val() === null));
        },
        (error) => {
          console.log("USER EXISTS ERROR: ", error);
          reject(error);
        }
      );
    });
  }
  
  // Updates the user's associated suite
  export function updateUserSuite(uid, suiteID) {
    console.log(`uid:/${uid}`);
    return db.ref(`users/${uid}`).update({
      // initialize to empty arrays by default
      suiteID: suiteID,
    });
  }
  
  // Adds user with id uid to the suite associated with suiteID
  export async function addUserToSuite(suiteID, uid) {
      Promise.all([checkSuiteExists(suiteID), checkUserExists(uid)])
        .then((res) => {
          const userListRef = db.ref(`suites/${suiteID}/users`);
          const newUserRef = userListRef.push();
          newUserRef.set({
            uid: uid,
          });
        })
        .catch((err) => console.log(err));
  }
  
  /* Should change this function's name to be more descriptive */
  // Checks if any suite is modified
  export function checkSuite() {
    const suites = db.ref("suites/");
  
    suites.on("child_changed", function (data) {
      const suite = data.val();
      console.log(`The new suite is ${suite.name}`);
      return true;
    });
  }
  
  // Checks if a user has an associated suite
  export function checkUserInSuite() {
    const user = db.ref("suites/");
    return user.suiteID === null;
  }