import { auth, db } from "./firebase";
import { checkUserExists, getUserData } from "./users";

// Creates a new suite
export async function createSuite(suiteID, suiteName) {
  /**
   * Create a new suite with id {suiteID} and name {suiteName}
   * @param {string} suiteID   ID of suite to create
   * @param {string} suiteName Name of suite to create
   */
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
    rules:
      "1. Be nice! \n2. Keep up with your chores every week.\n3. Log suite expenses in the app.\n4. Wait no more than 2 weeks to settle balances.\n5. Have a good time!",
  });
}

// Checks if suiteID is in the suites database
export function checkSuiteExists(suiteID) {
  /**
   * Check that suite {suiteID} exists in firebase
   * @param {string} suiteID   ID of suite to check
   */
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
  }).catch((err) => console.error(err));
}

// Adds user with id uid to the suite associated with suiteID
export async function addUserToSuite(suiteID, uid) {
  /**
   * Add user {uid} to suite {suiteID}
   * @param {string} suiteID   ID of suite to add user to
   * @param {string} uid       ID of user to add to suite
   */
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

export function deleteSuite(toDeleteID) {
  /**
   * Delete suite from firebase
   * @param {string} toDeleteID   ID of suite to delete
   */
  let toDelete = db.ref(`/suites/${toDeleteID}`);
  toDelete.remove();
}

export function disconnectFromChores(suiteID) {
  /**
   * Disconnects from active firebase listener to suites/{suiteID}/chores
   * @param {string} suiteID   ID of suite with connection
   */
  db.ref(`suites/${suiteID}/chores`).off("value");
}

export async function getUserChores(setChores, suiteID, uid = null) {
  /**
   * Filter suite chores to get only chores from user {uid}
   * @param {function} setChores    state update function for reflecting active changes on firebase
   * @param {string} suiteID        ID of suite to filter chores
   * @param {string} uid (optional) ID of user to get chores for - if null, use current user
   */
  if (!uid) {
    uid = auth.currentUser.uid;
  }
  let chores = [];
  return db.ref(`suites/${suiteID}/chores`).on(
    "value",
    (snapshot) => {
      let chores = [];
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          const chore = child.val();
          if (chore["assignees"][uid] && !chore.completed) {
            const newChore = {
              id: child.ref.key,
              ...chore,
            };
            chores.push(newChore);
          }
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

export function disconnectFromPayments(suiteID) {
  /**
   * Disconnects from active firebase listener to suites/{suiteID}/payments
   */
  db.ref(`suites/${suiteID}/payments`).off("value");
}

export function getSuitemates(
  setSuitemates,
  suiteID,
  uid = null,
  filter = null
) {
  /**
   * Get list of suitemates of suiteID
   * @param {function} setSuitemates   state update function for maintaining active firebase connection
   * @param {string} suiteID           ID of suite to query for suitemates
   * @param {string} uid               ID of user to exclude from suitemates list
   * @param {Object} filter            boolean filter to include/exclude suitemates from list.
   *                                   Example: filter={id1: true, id2: false, id3: true} would produce a list
   *                                            of suitemates that includes suitemates with id's id1 and id3,
   *                                            but not the suitemate with id id2
   */
  if (!uid) {
    uid = auth.currentUser.uid;
  }
  let chores = [];
  let transactions = [];
  return db
    .ref(`suites/${suiteID}/users`)
    .orderByChild("name")
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
                label: val.name,
                ...val,
              };
              if (filter) {
                if (filter[newSuitemate.id]) {
                  suitemates.push(newSuitemate);
                  setSuitemates(suitemates);
                }
              } else {
                suitemates.push(newSuitemate);
                setSuitemates(suitemates);
              }
            });
          });
        }
      },
      (err) => {
        console.error(err);
        setSuitemates([]);
      }
    );
}

export function disconnectFromSuitemates(suiteID) {
  /**
   * Disconnects from active firebase listener to suites/{suiteID}/users
   * @param {string} suiteID   ID of suite with connection
   */
  db.ref(`suites/${suiteID}/users`).off("value");
}
export async function getSuitematesList(suiteID) {
  /**
   * Get static list of suitemates from {suiteID}, including current user
   * @param {string} suiteID   ID of suite to query for suitemates
   */
  let suitemates = [];
  db.ref(`suites/${suiteID}/users`)
    .orderByChild("name")
    .on(
      "value",
      (snapshot) => {
        if (snapshot.exists()) {
          console.log("snapshot val");
          snapshot.forEach((child) => {
            const suitemate = child.val();
            suitemates.push(suitemate.uid);
          });
        }
      },
      (err) => {
        console.error(err);
      }
    );
  return suitemates;
}

export async function getRules() {
  /**
   * Get the suite rules for the suite of the current user
   */
  return new Promise((resolve, reject) => {
    let uid = auth.currentUser.uid;
    let suiteIDRef = db.ref(`users/${uid}/suiteID`);
    suiteIDRef
      .once("value", (snapshot) => {
        let suiteID = snapshot.val();
        let rulesRef = db.ref(`suites/${suiteID}/rules`);
        rulesRef
          .once("value", (snapshot2) => {
            resolve(snapshot2.val());
          })
          .catch(function (error) {
            reject(error);
          });
      })
      .catch(function (error) {});
  });
}

export async function updateRules(rules) {
  /**
   * Update the suite rules for the current user's suite
   */
  let uid = auth.currentUser.uid;
  let suiteIDRef = db.ref(`users/${uid}/suiteID`);
  await suiteIDRef.once("value", (snapshot) => {
    let suiteID = snapshot.val();
    db.ref(`suites/${suiteID}/rules`).set(rules);
  });
  return true;
}

export function getUserTransactions(setTransactions, suiteID, uid = null) {
  /**
   * Get suite payments filtered only to user {uid} or current user
   * @param {function} setTransactions   state update function for maintaining active connection to suite payments
   * @param {string} suiteID             ID of suite to query for transactions
   * @param {string} uid (default null)  ID of user to filter for transacions - if null, user current user
   */
  if (!uid) {
    uid = auth.currentUser.uid;
  }

  let transactions = [];
  return db.ref(`suites/${suiteID}/payments`).on(
    "value",
    (snapshot) => {
      let transactions = [];
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          const transaction = child.val();
          if (
            (transaction.payer == uid || transaction.payees == uid) &&
            !transaction.completed
          ) {
            const owed = transaction.payer == uid ? 1 : -1;
            const newTransaction = {
              id: child.ref.key,
              net_amount: parseFloat(transaction.amount) * owed,
              color: transaction.payer == uid ? "secondary" : "danger",
              ...transaction,
            };
            transactions.push(newTransaction);
          }
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

export function getUserTransactionsTogether(
  setTransactions,
  suiteID,
  otheruid,
  uid = null
) {
  /**
   * Make connection to firebase listener for transactions between user {uid} and {otherID}
   * @param {function} setTransactions   state update function to listen for changes in database
   * @param {string} suiteID             ID of suite containing users and transactions
   * @param {string} otheruid            ID of suitemate to filter for joint transactions
   * @param {string} uid (default null)  ID of suitemate to folter for joint transactinos, if null, user current user
   */
  if (!uid) {
    uid = auth.currentUser.uid;
  }

  let transactions = [];
  return db
    .ref(`suites/${suiteID}/payments`)
    .orderByKey()
    .on(
      "value",
      (snapshot) => {
        let transactions = [];
        if (snapshot.exists()) {
          snapshot.forEach((child) => {
            const transaction = child.val();
            if (
              (transaction.payer == uid) & (transaction.payees == otheruid) ||
              (transaction.payees == uid) & (transaction.payer == otheruid)
            ) {
              const owed = transaction.payer == uid ? 1 : -1;
              const newTransaction = {
                id: child.ref.key,
                net_amount: parseFloat(transaction.amount) * owed,
                color: transaction.payer == uid ? "secondary" : "danger",
                ...transaction,
              };
              transactions = [newTransaction, ...transactions];
            }
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
