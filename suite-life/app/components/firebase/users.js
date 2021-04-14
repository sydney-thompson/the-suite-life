import { auth, db, suites } from "./firebase";

// Creates a new user
export async function createUser(uid, name, pronouns, suiteID) {
  const userExists = await checkUserExists(uid);
  if (userExists) throw new Error("User already exists");
  
  // get list of suitemates 
  var suitemateList = suites.getSuitematesList(suiteID, uid)
  var balancesJSON = []
  await suitemateList.forEach((suitemate) => { 
    // TO DO: make this the actual suitemate field as the key 
    balancesJSON.push([suitemate , 0])

    // get balances field of the suitemate
    var balances = []
    db.ref(`users/${suitemate}/balances`).once('value').then(function(snapshot) {
      balances = snapshot.val(); 
    });
    // if balances do not exist, add balances field of the suitemate 
    if (balances == "None"){
      // TO DO: make this the actual suitemate field as the key 
      db.ref(`users/${suitemate}/balances`).set([[uid , 0]])
    }
    else{
    // set balances to balances.push(uid : 0)
    // TO DO: make this the actual suitemate field as the key 
      balances.push([uid , 0])
      db.ref(`users/${suitemate}/balances`).set(balances)
    }
  });
  if(suitemateList == []){
    balancesJSON = "None"
  }

  return db.ref(`users/${uid}`).set({
    // initialize to empty arrays by default
    uid: uid,
    name: name,
    pronouns: pronouns,
    suiteID: suiteID,
    balances: balancesJSON,
  });
}

// Delete a user
export function deleteUser (toDeleteID){
  let toDelete = db.ref(`/users/${toDeleteID}`)
  toDelete.remove()
}

// Checks if the uid is in the users database
export function checkUserExists(uid = null) {
  return new Promise((resolve, reject) => {
    try {
      if (!uid) {
        uid = auth.currentUser.uid;
      }
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
      console.log("auth has no user");
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
