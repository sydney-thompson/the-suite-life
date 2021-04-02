import { auth, db } from "./firebase";
import { checkUserExists, getUserData } from "./users";

// Creates a new suite
export async function createSuite(suiteID, suiteName) {
  const suiteExists = await checkSuiteExists(suiteID);
  if (suiteExists) throw new Error("A suite with this ID already exists");
  db.ref(`suites/${suiteID}`).set({
    // initialze to empty arrays by default
    chores: [],
    transactions: [],
    id: suiteID,
    messages: [],
    name: suiteName,
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
    .catch((err) => console.error(err));
}

/* Should change this function's name to be more descriptive */
// Checks if any suite is modified
export function checkSuite() {
  const suites = db.ref("suites/");

  suites.on("child_changed", function (data) {
    const suite = data.val();
    return true;
  });
}

// Checks if a user has an associated suite
export function checkUserInSuite() {
  const user = db.ref("suites/");
  return user.suiteID === null;
}

export function getUserChores(setChores, suiteID, uid = null) {
  if (!uid) {
    uid = auth.currentUser.uid;
  }

  let chores = [];
  return db
    .ref(`suites/${suiteID}/chores`)
    .orderByChild("assignee")
    .equalTo(uid)
    .on(
      "value",
      (snapshot) => {
        let chores = [];
        if (snapshot.exists()) {
          snapshot.forEach((child) => {
            const chore = child.val();
            const newChore = {
              id: child.ref.key,
              ...chore,
            };
            chores.push(newChore);
          });
        }
        setChores(chores);
      },
      (err) => {
        console.error(err);
        setChores([]);
      }
    );
}

export function disconnectFromChores(suiteID) {
  db.ref(`suites/${suiteID}/chores`).off("value");
}

export function getUserTransactions(setTransactions, suiteID, uid = null) {
  if (!uid) {
    uid = auth.currentUser.uid;
  }

  let transactions = [];
  return db
    .ref(`suites/${suiteID}/transactions`)
    .equalTo(uid)
    .on(
      "value",
      (snapshot) => {
        let transactions = [];
        if (snapshot.exists()) {
          snapshot.forEach((child) => {
            const transaction = child.val();
            const newTransaction = {
              id: child.ref.key,
              ...transaction,
            };
            transaction.push(newTransaction);
          });
        }
        setTransactions(transactions);
      },
      (err) => {
        console.error(err);
        setTransactions([]);
      }
    );
}

export function disconnectFromTransactions(suiteID) {
  db.ref(`suites/${suiteID}/transactions`).off("value");
}

export function getSuitemates(setSuitemates, suiteID, uid = null) {
  if (!uid) {
    uid = auth.currentUser.uid;
  }

  let chores = [];
  let transactions = [];
  return db
    .ref(`suites/${suiteID}/users`)
    .orderByChild("uid")
    .on(
      "value",
      (snapshot) => {
        let suitemates = [];
        if (snapshot.exists()) {
          snapshot.forEach((child) => {
            const suitemate = child.val();
            getUserData(suitemate.uid).then((val) => {
              const newSuitemate = {
                id: val.uid,
                ...val,
              };
              suitemates.push(newSuitemate);
              setSuitemates(suitemates);
            });
          });
        }
        setSuitemates(suitemates);
      },
      (err) => {
        console.error(err);
        setSuitemates([]);
      }
    );
}

export function disconnectFromSuitemates(suiteID) {
  db.ref(`suites/${suiteID}/users`).off("value");
}
