import { auth, db } from "./firebase";

export function loadChoreData (firebaseID){
    var returnData = []
    db.ref(`/suites/test123/chores/${firebaseID}`).once('value', snapshot => {
        let data = snapshot.val()
        returnData = {'name': data.name, 'frequency': data.frequency, 'assignee': data.assignee}
    });
    return returnData
  }

// function to push new chore to firebase
export function addNewChore (choreName, choreFrequency, choreAssignee){
    db.ref(`/suites/test123/chores`).once('value', snapshot => {
      let data = snapshot.val()
      if(data == "None"){
        db.ref('/suites/test123/chores/').set({
          name: choreName, 
          frequency: choreFrequency,
          assignee: choreAssignee
        });
        choreFunctions.updateChore (choreName, choreFrequency, choreAssignee)
      }
      else{
        db.ref('/suites/test123/chores/').push({
          name: choreName, 
          frequency: choreFrequency,
          assignee: choreAssignee
        });
      }
    });
  }

// function to update data in firebase
export function updateChore (choreName, choreFrequency, choreAssignee, firebaseID){
    db.ref(`/suites/test123/chores/${firebaseID}`).set({
      name: choreName, 
      frequency: choreFrequency,
      assignee: choreAssignee
    });
  }

// deletes chore from firebase 
export function deleteChore (toDeleteID){
    let toDelete = db.ref(`/suites/test123/chores/${toDeleteID}`)
    toDelete.remove()
  }

// currently does not work 
export function renderChoress(){
    console.log("renderChoress 1")
    const choreJSON1 = []
    const render_promise = new Promise((resolve, reject) => {
        // grab chore data from firebase 
        db.ref().child('suites').child('test123').child('chores').on('value', (snapshot)=>{
            console.log("renderChoress 2")
            let data = snapshot.val();
            let keys = Object.keys(data);
            // loop through firebase data and add data to choreJSON for use in rendering elements
            keys.forEach((key) => { 
                choreJSON1.push({name: data[key].name, firebaseID: key, frequency: data[key].frequency})
            });
        });
        console.log("renderChoress 3")
        //console.log(choreJSON1)
    })
    console.log("renderChoress 4")
    render_promise.then(
        console.log("renderChoress 5")
    )
    return choreJSON1
    }