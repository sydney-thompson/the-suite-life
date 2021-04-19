import { auth, db } from "./firebase";

export async function get_suiteID() {
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

  /* return new Promise((resolve, reject) => {
      const ref =  db.ref(`/suites/test123/chores/${firebaseID}`);
      ref
        .once("value", (snapshot) => {
          if (snapshot.exists()) {
            resolve(snapshot.val());
          } else {
            resolve({ code: "chore-not-found" });
          }
        })
        .catch(function (error) {
          reject(error);
        });
    }); */
}

// function to push new chore to firebase
export async function addNewChore(info) {
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

// function to push new chore to firebase
export async function addNewChore1(info) {
  var suiteID = await get_suiteID();
  await db.ref(`/suites/${suiteID}/chores`).once("value", (snapshot) => {
    let data = snapshot.val();
    if (data == "None") {
      db.ref("/suites/" + suiteID + "/chores/").set({
        name: info.name,
        frequency: info.frequency,
        assignees: info.assignees,
        details: info.details,
        completed: info.completed,
      });
      choreFunctions.updateChore(info);
    } else {
      db.ref("/suites/${suiteID}/chores/").push({
        name: info.name,
        frequency: info.frequency,
        assignees: info.assignees,
        details: info.details,
        completed: info.completed,
      });
    }
  });
}

// function to update data in firebase
export function updateChore(chore, choreID, suiteID) {
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
