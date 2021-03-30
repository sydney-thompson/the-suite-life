import { auth, db } from "./firebase";
import { checkUserExists } from "./users";

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

export function getUserChores(suiteID, uid = null) {
  if (!uid) {
    uid = auth.currentUser.uid;
  }

  const chores = [];
  return new Promise((resolve, reject) => {
    const ref = db.ref(`suites/${suiteID}/chores`);

    let chores = [];
    try {
      ref.once(
        "value",
        (snapshot) => {
          snapshot.forEach((child) => {
            const chore = child.val();
            console.log("child:", chore);
            console.log("assignee:", chore["assignee"]);
            if (chore.assignee == uid) {
              const new_chore = {
                id: `${chore.assignee}-${chore.name}-${chore.frequency}`,
                ...chore,
              };
              console.log("chore:", new_chore);
              chores.push(new_chore);
            } else {
              console.log(
                `no match - uid: ${uid} - assignee: ${child.val().assignee}`
              );
            }
          });
          resolve(chores);
        },
        (error) => {
          console.log("SUITE EXISTS ERROR: ", error);
          resolve([]);
        }
      );

      // ref.child("chores").orderByChild("assignee").equalTo(uid);
      // ref.once("value", (snapshot) => {
      //   // .on("child_added", function (snapshot) {
      //   if (snapshot.exists()) {
      //     // console.log("exists - val:", snapshot.val());
      //     chore = snapshot.val();
      //     console.log("chore:", chore);
      //     return chore;
      //     // chores.push({ id: chore.name, ...chore });
      //     // console.log("chores len:", chores.length);
      //     // resolve(snapshot.val());
      //   } else {
      //     // console.log("nope");
      //     return chores;
      //   }
      // });
      // // console.log("chores:", chores);
      // return chores;
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

//   return new Promise((resolve, reject) => {
//     const chores = [];
//     const ref = db.ref(`suites/${suiteId}`);
//     ref
//       .child("chores")
//       .orderByChild("assignee")
//       .equalTo(uid)
//       .on("child_added", function (snapshot) {
//         if (snapshot.exists()) {
//           // console.log("exists - val:", snapshot.val());
//           chores.push({ id: snapshot.val().name, ...snapshot.val });
//           console.log("chores len:", chores.length);
//           // resolve(snapshot.val());
//         } else {
//           console.log("nope");
//           resolve({});
//         }
//       })
//       .catch(function (error) {
//         reject(error);
//       });
//     console.log("chores:", chores);
//     resolve(chores);
//   });
// }
