import { auth, db } from "./firebase";

// gets one chore's data from firebase 
export function loadChoreData (firebaseID){
    var returnData = []
    db.ref(`/suites/test123/chores/${firebaseID}`).once('value', snapshot => {
        let data = snapshot.val()
        returnData = {'name': data.name, 'frequency': data.frequency, 'assignees': data.assignees, 'details': data.details, 'completed': data.completed}
    });
    return returnData
  }

// function to update data in firebase
export function updateChore (info, firebaseID){
    db.ref(`/suites/test123/chores/${firebaseID}`).set({
      name: info.name, 
      frequency: info.frequency,
      assignees: info.assignees,
      details: info.details,
      completed: info.completed
    });
  }

// deletes chore from firebase 
export function deleteChore (toDeleteID){
    let toDelete = db.ref(`/suites/test123/chores/${toDeleteID}`)
    toDelete.remove()
  }

// currently does not work 
export function renderChoress(){
    const choreJSON1 = []
    const render_promise = new Promise((resolve, reject) => {
        // grab chore data from firebase 
        db.ref().child('suites').child('test123').child('chores').on('value', (snapshot)=>{
            let data = snapshot.val();
            let keys = Object.keys(data);
            // loop through firebase data and add data to choreJSON for use in rendering elements
            keys.forEach((key) => { 
                choreJSON1.push({name: data[key].name, firebaseID: key, frequency: data[key].frequency})
            });
        });
        //console.log(choreJSON1)
    })
    render_promise.then(
        //console.log("renderChoress 5")
    )
    return choreJSON1
    }

export async function get_suiteID (){
  var uid = auth.currentUser.uid;
  var data = null 

  await db.ref(`users/${uid}/suiteID/`).once('value').then(function(snapshot) {
    data = snapshot.val(); 
  });
  return data 
}

// function to push new chore to firebase
export async function addNewChore (info){
  var suiteID = await get_suiteID()
  await db.ref('/suites/' + suiteID + '/chores/').push({
        name: info.name, 
        frequency: info.frequency,
        assignees: info.assignees,
        details: info.details,
        completed: info.completed
      });
    }