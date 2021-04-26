import { auth, db } from "./firebase";

export async function get_suiteID() {
  /**
   * Get suite id of the currently logged-in user
   */
  var uid = auth.currentUser.uid;
  var data = null;

  await db
    .ref(`users/${uid}/suiteID/`)
    .once("value")
    .then(function (snapshot) {
      data = snapshot.val();
    });
  return data;
}

// gets one chore's data from firebase
export async function loadChoreData(firebaseID) {
  /**
   * Load chore {firebaseID} from current user's suite
   * @param {string} firebaseID   ID of chore to load
   */
  var suiteID = await get_suiteID();
  var returnData = [];
  await db
    .ref(`/suites/${suiteID}/chores/${firebaseID}`)
    .once("value", (snapshot) => {
      let data = snapshot.val();
      returnData = {
        name: data.name,
        frequency: data.frequency,
        assignees: data.assignees,
        details: data.details,
        completed: data.completed,
      };
    });
  return returnData;
}

// function to push new chore to firebase
export async function addNewChore(info) {
  /**
   * Add new chore to the current user's suite
   * @param {Object} info     Chore details. Should be structured as follows:
   *        {
   *            assignees: {
   *                suitemateID: true/false, (need entry for each suitemate)
   *            }
   *            completed: true/false,
   *            day: string, (from config/daysOfWeek.js)
   *            details: string,
   *            name: string,
   *            recurring: true/false
   *        }
   */
  var suiteID = await get_suiteID();
  await db.ref(`/suites/${suiteID}/chores/`).push({
    assignees: info.assignees,
    completed: false,
    day: info.day.label,
    details: info.details,
    name: info.name,
    recurring: info.recurring,
  });
}

// function to update data in firebase
export function updateChore(chore, choreID, suiteID) {
  /**
   * Update {choreID} in suite {suiteID} with details from {chore}
   * @param {Object} chore    chore with details to update - requires name, recurring, assignees, details, and day
   * @param {string} choreID  ID of chore to update
   * @param {string} suiteID  ID of suite containing chore
   */
  return new Promise((resolve, reject) => {
    const choreUpdate = {
      name: chore.name,
      recurring: chore.recurring,
      assignees: chore.assignees,
      details: chore.details,
      day: chore.day.label,
    };
    db.ref(`/suites/${suiteID}/chores/${choreID}`).update(
      choreUpdate,
      (error) => {
        if (error) {
          // The write failed...
          console.error("error:", error);
          reject();
        } else {
          // Data saved successfully!
          resolve();
        }
      }
    );
  });
}

export function completeChore(choreID, suiteID) {
  /**
   * Mark chore {choreID} as complete in suite {suiteID}
   * @param {string} choreID    ID of chore to mark complete
   * @param {string} suiteID    ID of suite to search for chore
   */
  return new Promise((resolve, reject) => {
    const choreUpdate = {
      completed: true,
    };
    db.ref(`/suites/${suiteID}/chores/${choreID}`).update(
      choreUpdate,
      (error) => {
        if (error) {
          // The write failed...
          console.error("error:", error);
          reject();
        } else {
          // Data saved successfully!
          resolve();
        }
      }
    );
  });
}

// deletes chore from firebase
export async function deleteChore(toDeleteID) {
  var suiteID = await get_suiteID();
  let toDelete = await db.ref(`/suites/${suiteID}/chores/${toDeleteID}`);
  toDelete.remove();
}

// currently does not work
export async function renderChoress() {
  var suiteID = await get_suiteID();
  const choreJSON1 = [];
  const render_promise = new Promise((resolve, reject) => {
    // grab chore data from firebase
    db.ref()
      .child("suites")
      .child({ suiteID })
      .child("chores")
      .on("value", (snapshot) => {
        let data = snapshot.val();
        let keys = Object.keys(data);
        // loop through firebase data and add data to choreJSON for use in rendering elements
        keys.forEach((key) => {
          choreJSON1.push({
            name: data[key].name,
            firebaseID: key,
            frequency: data[key].frequency,
          });
        });
      });
  });
  render_promise.then();
  return choreJSON1;
}

export async function getSuiteChores(setChores, suiteID) {
  let chores = [];
  return db
    .ref(`suites/${suiteID}/chores`)
    .orderByChild("day")
    .on(
      "value",
      (snapshot) => {
        let chores = [];
        if (snapshot.exists()) {
          snapshot.forEach((child) => {
            const chore = child.val();
            if (!chore.completed) {
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
