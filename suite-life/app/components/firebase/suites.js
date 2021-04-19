import { ref } from "yup";
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
    rules:
      "1. Be nice! \n2. Keep up with your chores every week.\n3. Log suite expenses in the app.\n4. Wait no more than 2 weeks to settle balances.\n5. Have a good time!",
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
  }).catch((err) => console.error(err));
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

export function deleteSuite(toDeleteID) {
  let toDelete = db.ref(`/suites/${toDeleteID}`);
  toDelete.remove();
}

export function disconnectFromChores(suiteID) {
  db.ref(`suites/${suiteID}/chores`).off("value");
}

export async function getUserChores(setChores, suiteID, uid = null) {
  if (!uid) {
    uid = auth.currentUser.uid;
  }
  let chores = [];
  return (
    db
      .ref(`suites/${suiteID}/chores`)
      // .orderByChild("assignee")
      // .equalTo(uid)
      .on(
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
      )
  );
}

export function disconnectFromTransactions(suiteID) {
  db.ref(`suites/${suiteID}/transactions`).off("value");
}

export function getSuitemates(
  setSuitemates,
  suiteID,
  uid = null,
  filter = null
) {
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
        // setSuitemates(suitemates);
      },
      (err) => {
        console.error(err);
        setSuitemates([]);
      }
    );
}

export async function getSuitematesList(suiteID, uid = null) {
  if (!uid) {
    uid = auth.currentUser.uid;
  }
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
  let uid = auth.currentUser.uid;
  let suiteIDRef = db.ref(`users/${uid}/suiteID`);
  await suiteIDRef.once("value", (snapshot) => {
    let suiteID = snapshot.val();
    db.ref(`suites/${suiteID}/rules`).set(rules);
  });
  return true;
}

export function disconnectFromSuitemates(suiteID) {
  db.ref(`suites/${suiteID}/users`).off("value");
}

export function getUserTransactions(setTransactions, suiteID, uid = null) {
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
          if (transaction.payer == uid || transaction.payees == uid) {
            const owed = transaction.payer == uid ? 1 : -1;
            const newTransaction = {
              id: child.ref.key,
              net_amount: parseFloat(transaction.amount) * owed,
              color: transaction.payer == uid ? "danger" : "secondary",
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
            (transaction.payer == uid) & (transaction.payees == otheruid) ||
            (transaction.payees == uid) & (transaction.payer == otheruid)
          ) {
            const newTransaction = {
              id: child.ref.key,
              color: transaction.payer == uid ? "danger" : "secondary",
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

export function createTestSuite() {
  const values = {
    chores: {
      "-MVDhXxMKjp4Zgmx4_DT": {
        assignees: {
          "3W6ZDlPdDhWmPxvPGVBSa9U3A4l2": false,
          "8lh1VeoQrtb3gAWFEDt7Dfbwvzd2": false,
          IdIiDUvCu9bnb5QkdwmThJoAi863: true,
          SbyVXqeCisX8IvEnZosxFHytqw53: false,
          b3q3PcKIfdgUapdHbkCLgsUtWQ83: false,
          mJNOAnpK4ZTF5v9MeLSFa5nqCrH3: false,
          oiZtBtU47TW3C6UA7tFq5KV5UW12: true,
          yjGDsdtY9jNjjpyMaEWHFFzhQa43: true,
        },
        completed: false,
        day: "Tuesday",
        details: "do that laundry!",
        frequency: "once",
        title: "Laundry",
      },
      "-MVDhdgzPAbOSfwDlSwc": {
        assignees: {
          "3W6ZDlPdDhWmPxvPGVBSa9U3A4l2": false,
          "8lh1VeoQrtb3gAWFEDt7Dfbwvzd2": false,
          IdIiDUvCu9bnb5QkdwmThJoAi863: false,
          SbyVXqeCisX8IvEnZosxFHytqw53: false,
          b3q3PcKIfdgUapdHbkCLgsUtWQ83: false,
          mJNOAnpK4ZTF5v9MeLSFa5nqCrH3: false,
          oiZtBtU47TW3C6UA7tFq5KV5UW12: true,
          yjGDsdtY9jNjjpyMaEWHFFzhQa43: true,
        },
        completed: false,
        day: "Sunday",
        details: "they moldy",
        frequency: "weekly",
        title: "Dishes",
      },
      "-MXT4ccMMN8ShLVzW-xB": {
        assignees: {
          "3W6ZDlPdDhWmPxvPGVBSa9U3A4l2": false,
          "8lh1VeoQrtb3gAWFEDt7Dfbwvzd2": false,
          IdIiDUvCu9bnb5QkdwmThJoAi863: true,
          SbyVXqeCisX8IvEnZosxFHytqw53: false,
          b3q3PcKIfdgUapdHbkCLgsUtWQ83: false,
          mJNOAnpK4ZTF5v9MeLSFa5nqCrH3: false,
          oiZtBtU47TW3C6UA7tFq5KV5UW12: true,
          yjGDsdtY9jNjjpyMaEWHFFzhQa43: false,
        },
        completed: false,
        day: "Saturday",
        details: "they dusty",
        frequency: "weekly",
        title: "Vaccuum",
      },
    },
    id: 12345678,
    name: "Test Suite",
    payments: {
      "-MXOKMzicMEWNJebAzFy": {
        amount: 100.01,
        completed: false,
        details: "Some payment details",
        payees: {
          "3W6ZDlPdDhWmPxvPGVBSa9U3A4l2": false,
          "8lh1VeoQrtb3gAWFEDt7Dfbwvzd2": true,
          IdIiDUvCu9bnb5QkdwmThJoAi863: false,
          SbyVXqeCisX8IvEnZosxFHytqw53: false,
          b3q3PcKIfdgUapdHbkCLgsUtWQ83: false,
          mJNOAnpK4ZTF5v9MeLSFa5nqCrH3: false,
          oiZtBtU47TW3C6UA7tFq5KV5UW12: false,
          yjGDsdtY9jNjjpyMaEWHFFzhQa43: false,
        },
        payer: "z0Ax8ZANZdSZNFdr3o7TeDdDAal2",
        title: "so many groceries",
      },
      "-MXPC4kLU4IKZhB0OCg0": {
        amount: 350.52,
        completed: false,
        details: "april rent details here is some more details",
        payees: {
          "3W6ZDlPdDhWmPxvPGVBSa9U3A4l2": true,
          "8lh1VeoQrtb3gAWFEDt7Dfbwvzd2": false,
          IdIiDUvCu9bnb5QkdwmThJoAi863: true,
          SbyVXqeCisX8IvEnZosxFHytqw53: false,
          b3q3PcKIfdgUapdHbkCLgsUtWQ83: false,
          mJNOAnpK4ZTF5v9MeLSFa5nqCrH3: false,
          oiZtBtU47TW3C6UA7tFq5KV5UW12: false,
          yjGDsdtY9jNjjpyMaEWHFFzhQa43: false,
        },
        payer: "IdIiDUvCu9bnb5QkdwmThJoAi863",
        title: "rent April",
      },
      "-MXTH1vRGc_bIWQRYBgr": {
        amount: 150,
        completed: false,
        details: "March rent details",
        payees: {
          "3W6ZDlPdDhWmPxvPGVBSa9U3A4l2": true,
          "8lh1VeoQrtb3gAWFEDt7Dfbwvzd2": true,
          IdIiDUvCu9bnb5QkdwmThJoAi863: true,
          b3q3PcKIfdgUapdHbkCLgsUtWQ83: true,
          mJNOAnpK4ZTF5v9MeLSFa5nqCrH3: false,
          oiZtBtU47TW3C6UA7tFq5KV5UW12: false,
          yjGDsdtY9jNjjpyMaEWHFFzhQa43: false,
          z0Ax8ZANZdSZNFdr3o7TeDdDAal2: false,
        },
        payer: "SbyVXqeCisX8IvEnZosxFHytqw53",
        title: "rent March",
      },
      "-MXTHCMyhxQJ2O2PtGse": {
        amount: 57,
        completed: false,
        details: "it was a delicious dinner",
        payees: {
          "3W6ZDlPdDhWmPxvPGVBSa9U3A4l2": true,
          "8lh1VeoQrtb3gAWFEDt7Dfbwvzd2": true,
          IdIiDUvCu9bnb5QkdwmThJoAi863: true,
          SbyVXqeCisX8IvEnZosxFHytqw53: false,
          b3q3PcKIfdgUapdHbkCLgsUtWQ83: false,
          mJNOAnpK4ZTF5v9MeLSFa5nqCrH3: false,
          yjGDsdtY9jNjjpyMaEWHFFzhQa43: false,
          z0Ax8ZANZdSZNFdr3o7TeDdDAal2: false,
        },
        payer: "oiZtBtU47TW3C6UA7tFq5KV5UW12",
        title: "dinner Friday",
      },
    },
    rules: "Rule 1\nRule2\nRule3",
    users: {
      111: {
        uid: "3W6ZDlPdDhWmPxvPGVBSa9U3A4l2",
      },
      112: {
        uid: "8lh1VeoQrtb3gAWFEDt7Dfbwvzd2",
      },
      113: {
        uid: "IdIiDUvCu9bnb5QkdwmThJoAi863",
      },
      114: {
        uid: "SbyVXqeCisX8IvEnZosxFHytqw53",
      },
      115: {
        uid: "b3q3PcKIfdgUapdHbkCLgsUtWQ83",
      },
      116: {
        uid: "mJNOAnpK4ZTF5v9MeLSFa5nqCrH3",
      },
      117: {
        uid: "oiZtBtU47TW3C6UA7tFq5KV5UW12",
      },
      118: {
        uid: "yjGDsdtY9jNjjpyMaEWHFFzhQa43",
      },
      119: {
        uid: "z0Ax8ZANZdSZNFdr3o7TeDdDAal2",
      },
    },
  };
  db.ref("suites/12345678").set(values);
}
